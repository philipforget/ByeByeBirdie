import logging
import tweepy

from django.conf import settings
from django.contrib.auth.models import AbstractUser, UserManager
from django.core.cache import cache
from django.db import models
from social_auth.models import UserSocialAuth
from tweepy.error import TweepError

from main.models import Unfollow

logger = logging.getLogger(__name__)



class CustomUserManager(UserManager):
    def get_or_create_by_username(self, username):
        """Get a user by username. If one doesn't exist, create it.

        Return a tuple of (created <bool>, user) like other Django
        get_or_create methods.
        """
        user = None
        created = False
        try:
            user = self.get(username=username)

        except CustomUser.DoesNotExist:
            try:
                twitter_user = tweepy.api.get_user(username)

            except TweepError:
                raise ValueError("No user '%s' found" % username)

            user = self.create_user(
                username = username,
                name = twitter_user.name)

            created = True

        return created, user


class CustomUser(AbstractUser):
    name = models.CharField(max_length=40, blank=True)
    is_opted_out = models.BooleanField(default=False)
    is_banned = models.BooleanField(default=False)
    has_authed_in = models.BooleanField(default=False)

    objects = CustomUserManager()


    def serialize(self):
        return {
            'name': self.name,
            'screen_name': self.username
        }


    @property
    def avatar_url(self):
        """Return a properly formed twitter avatar url for this user.

        """
        return "http://api.twitter.com/1/users/profile_image/{0}".format(
            self.username)


    @property
    def tokens(self):
        """Get twitter auth tokens for user.

        Returns a dict with keys `oauth_token` and `oauth_token_secret`.
        """
        auth = UserSocialAuth.objects.get(user=self)
        return auth.tokens


    @property
    def tweepy_authd_api(self):
        """Get an authenticated `tweepy.api.API` object

        """
        if getattr(self, '_tweety_api', None) is None:
            access_token = self.tokens['oauth_token']
            access_token_secret = self.tokens['oauth_token_secret']

            try:
                consumer_key = settings.TWITTER_CONSUMER_KEY
                consumer_secret = settings.TWITTER_CONSUMER_SECRET
            except AttributeError:
                raise AttributeError(
                    "No consumer key or secret found. "
                    "Please configure your settings to include them")

            auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
            auth.set_access_token(access_token, access_token_secret)

            self._tweepy_api = tweepy.API(auth)

        return self._tweepy_api


    @property
    def cache_key_map(self):
        return {
            'mine': '%s-mine-list' % self.username,
            'unfollowed': '%s-unfollowed-list' % self.username,
            'unfollows': '%s-list' % self.username,
        }


    def get_cache_key(self, slug):
        return self.cache_key_map[slug]


    def get_and_cache_list(self, slug, force_refresh=False):
        cache_key = self.get_cache_key(slug)
        cached = None

        # First check the object cache
        if getattr(self, cache_key, None) is None or force_refresh:

            # Then check memcache
            if cache.get(cache_key, None) is None or force_refresh:
                print "No cache hit"
                # We have no hit at all, grab it
                cached = {
                    'mine': self.unfollowed_by.all(),
                    'unfollowed': self.unfollow_set.all(),
                    'unfollows': Unfollow.objects.filter(
                        user = self,
                        public = True,
                        is_active = True)
                }[slug]

                cache.set(cache_key, cached, 24 * 60 * 60)

            else:
                print "Memcached  hit"

            if cached is None:
                cached = cache.get(cache_key)

            setattr(self, cache_key, cached)

        else:
            print "Object cache hit"

        return cached

    
    def invalidate_list_caches(self):
        """Invalidate all list caches.

        """
        cache.delete_many(self.cache_key_map.values())


    def unfollow(self, username_to_unfollow, message):
        """Create an Unfollow for this user to `username_to_unfollow`.

        `username_to_unfollow` should be a string of a Twitter username.
        """
        # Create the user locally, just in case
        created, user_to_unfollow = \
            CustomUser.objects.get_or_create_by_username(username_to_unfollow)

        if user_to_unfollow.is_opted_out or self.is_opted_out:
            raise ValueError("Cannot unfollow opted out users")

        return Unfollow.create_unfollow(
            user = user_to_unfollow,
            unfollowed_by = self,
            message = message)


    def _grab_following_from_twitter(self):
        """Internal method to actually query twitter for friends

        """
        ids = self.tweepy_authd_api.friends_ids(cursor=-1)[0]
        users = []

        start = 0
        while start < len(ids):
            ids_to_process = ids[start:start + 100]
            users += self.tweepy_authd_api.lookup_users(
                user_ids = ids_to_process)

            start += 100

        return [
            {
                'screen_name': user.screen_name,
                'name': user.name
            } for
            user in users]


    def get_following(self, force_refresh=False):
        """Return a list of all people a user is following

        Checks object cache > Memcache > Lookup and caches up each layer on a
        miss.
        """
        cache_key = '%s-following' % self.username

        if force_refresh or getattr(self, '_following', None) is None:
            if force_refresh or cache.get(cache_key, None) is None:
                following = self._grab_following_from_twitter()
                cache.set(cache_key, following, 7 * 24 * 60 * 60)

            else:
                following = cache.get(cache_key)

            self._following = following

        return self._following
