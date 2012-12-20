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
    is_active = models.BooleanField(default=True)


    @classmethod
    def create_unfollow(cls, user, unfollowed_by, message):
        # Deactivate any existing active unfollows between these users
        cls.objects.filter(
            user = user,
            unfollowed_by = unfollowed_by,
            is_active = True).update(
                is_active=False)

        return cls.objects.create(
            user = user,
            unfollowed_by = unfollowed_by,
            # Lets go ahead and trunkate at 500, people are dumb
            message = message[:500])


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
