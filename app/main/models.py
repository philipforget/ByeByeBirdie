from django.conf import settings
from django.db import models



class Unfollow(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL)
    unfollowed_by = models.ForeignKey(settings.AUTH_USER_MODEL,
        related_name='unfollowed_by')
    public = models.BooleanField(default=True)
    anonymous = models.BooleanField(default=False)
    date_created = models.DateTimeField(auto_now_add=True)

    class Meta(object):
        unique_together = (('user', 'unfollowed_by'),)
