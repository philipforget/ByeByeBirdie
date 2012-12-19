from django.db import models
from django.contrib.auth.models import AbstractUser


class CustomUser(AbstractUser):
    handle = models.CharField(max_length=40)
    is_opted_out = models.BooleanField(default=False)
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
