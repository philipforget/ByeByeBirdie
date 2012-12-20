import tweepy

from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.core.cache import cache
from django.db import models

from social_auth.models import UserSocialAuth


class CustomUser(AbstractUser):
    name = models.CharField(max_length=40)
    is_opted_out = models.BooleanField(default=False)
    is_banned = models.BooleanField(default=False)
    has_authed_in = models.BooleanField(default=False)


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
        try:
            auth = UserSocialAuth.objects.get(user=self)
        except UserSocialAuth.ObjectDoesNotExist:
            return None
        return auth.tokens


    def unfollow(self, to_follow):
        """Create an Unfollow for this user

        """
        pass


    @property
    def tweepy_authd_api(self):
        """Get an authenticated `tweepy.api.API` object

        """
        tokens = self.tokens

        # lol paranoia
        if tokens is None:
            # derp what do here?
            return None

        access_token = tokens.get('oauth_token', None)
        access_token_secret = tokens.get('oauth_token_secret', None)
        if access_token is None or access_token_secret is None:
            # derp what do here?
            return None

        consumer_key = getattr(settings, 'TWITTER_CONSUMER_KEY', None)
        consumer_secret = getattr(settings, 'TWITTER_CONSUMER_SECRET', None)
        if consumer_key is None or consumer_secret is None:
            # derp what do here?
            return None

        auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
        auth.set_access_token(access_token, access_token_secret)

        return tweepy.API(auth)


    @property
    def tweepy_user(self):
        return tweepy.api.get_user(self.username)


    def _grab_followers_from_twitter(self):
        """Internal method to actually query twitter for followers

        """
        cursor = 1
        
        followers = []
        # At most, grab 1000 followers
        while cursor < 100:
            poop = self.tweepy_user.friends(cursor=cursor)

            print poop 

            results = [friend.screen_name for
                friend in
                self.tweepy_user.friends(cursor=cursor)]

            followers.append(results)
            cursor += 1

            # Less than 100 results means there's none left to page
            if len(results) < 100:
                break

        return followers


    def get_followers(self, force_refresh=False):
        cache_key = '%s-followers' % self.username

        if (getattr(self, '_followers', None) is None or
            cache.get(cache_key, None) is None or
            force_refresh):
            followers = self._grab_followers_from_twitter()

            cache.set(cache_key, followers, 7 * 24 * 60 * 60)
            self._followers = followers

        return self._followers
