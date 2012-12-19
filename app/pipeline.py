def set_user_details(details, user, *args, **kwargs):
    """Set user details at the end of pipeline.

    Called at the end of the social_auth pipeline.
    """
    user.name = details.get('fullname', '')
    user.has_authed_in = True
    user.save()
