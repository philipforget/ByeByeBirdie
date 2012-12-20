from django.conf import settings
from django.db import models



class Unfollow(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, db_index=True)
    message = models.TextField(max_length=500)
    unfollowed_by = models.ForeignKey(settings.AUTH_USER_MODEL,
        related_name='unfollowed_by', db_index=True)
    public = models.BooleanField(default=True)
    anonymous = models.BooleanField(default=False)
    date_created = models.DateTimeField(auto_now_add=True)

    class Meta(object):
        ordering = ['-date_created',]


    def serialize(self):
        return {
            'user': self.user.serialize(),
            'message': self.message,
            'unfollowed_by': self.unfollowed_by.serialize(),
            'public': self.public,
            'anonymous': self.anonymous,
            'date_created': self.date_created.isoformat()
        }
