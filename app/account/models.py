from django.db import models


class CustomUser(models.AbstractBaseUser):
    username = models.CharField(max_length=15, unique=True, db_index=True)
    handle = models.CharField(max_length=40)
    is_opted_out = models.BooleanField(default=False)
    has_authed_in = models.BooleanField(default=False)

    USERNAME_FIELD = 'identifier'


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
