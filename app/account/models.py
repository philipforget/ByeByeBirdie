import logging

import tweepy

from django.conf import settings
from django.contrib.auth.models import AbstractUser, UserManager
from django.core.cache import cache
from django.db import models

from social_auth.models import UserSocialAuth

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
            user = self.create_user(username)
            created = True
            # need to set name?
        return created, user


class CustomUser(AbstractUser):
    name = models.CharField(max_length=40, blank=True)
    is_opted_out = models.BooleanField(default=False)
    is_banned = models.BooleanField(default=False)
    has_authed_in = models.BooleanField(default=False)

    objects = CustomUserManager()


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


    def unfollow(self, to_unfollow_username):
        """Create an Unfollow for this user to `to_unfollow_username`.

        `to_unfollow_username` should be a string of a Twitter username.
        """
        created, to_unfollow_user = \
            CustomUser.objects.get_or_create_by_username(to_unfollow_username)

        try:
            self.tweepy_authd_api.destroy_friendship(
                screen_name=to_unfollow_username)
        except tweepy.error.TweepError, e:
            import pdb; pdb.set_trace()
            logger.warn('Error destroying friendships. %s', e)
        else:
            Unfollow.objects.create(user=to_unfollow_user,
                unfollowed_by=self)


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


    def _grab_following_from_twitter(self):
        """Internal method to actually query twitter for friends

        """

        results = self.tweepy_authd_api.friends(cursor=-1)[0]

        return [
            {
                'screen_name': result.screen_name,
                'name': result.name
            } for
            result in results]


    def get_following(self, force_refresh=False):
        cache_key = '%s-following' % self.username

        if (getattr(self, '_following', None) is None or
            cache.get(cache_key, None) is None or
            force_refresh):
            following = self._grab_following_from_twitter()

            cache.set(cache_key, following, 7 * 24 * 60 * 60)
            self._following = following

        return self._following
