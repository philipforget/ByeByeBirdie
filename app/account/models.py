from django.db import models
from django.contrib.auth.models import AbstractUser

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


    def unfollow(self, unfollowed_by):
        """Create an Unfollow for this user

        """
        pass


    @property
    def tokens(self):
        """Get tokens for user.

        Returns a dict with keys `oauth_token` and `oauth_token_secret`.
        """
        try:
            auth = UserSocialAuth.objects.get(user=self)
        except UserSocialAuth.ObjectDoesNotExist:
            return None
        return auth.tokens
