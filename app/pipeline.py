from social_auth.backends import USERNAME

from account.models import CustomUser



def set_user_details(details, user, *args, **kwargs):
    """Set user details at the end of pipeline.

    Called at the end of the social_auth pipeline.
    """
    user.name = details.get('fullname', '')
    user.has_authed_in = True
    user.save()



def create_user(backend, details, response, uid, user=None, *args, **kwargs):
    """Create a user while being mindful if one already exists.

    Can't use the builin `create_user` in social_auth because we have
    to be mindful of existing users. See
    `social_auth.backends.pipeline.user.create_user` for details as to why
    social_auth forces user creation.
    """
    # if we already have a user bail.
    # `is_new` is set to False by default at the beginning of the pipeline
    # so we don't have to worry about it.
    if user is not None:
        return None
    username = details.get(USERNAME, None)

    # should never happen. this should come from twitter
    assert username is not None, 'No username found'

    created, user = CustomUser.objects.get_or_create_by_username(username)

    return {'user': user, 'is_new': created}
