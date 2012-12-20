import logging

from annoying.decorators import render_to
from django.contrib.auth import get_user_model
from django.contrib.auth import logout as auth_logout
from django import http

from .models import Unfollow


logger = logging.getLogger(__name__)



@render_to('home.html')
def home(request):
    """Homepage"""
    return {}


@render_to('user.html')
def user_page(request, username):
    """User page

    """
    # Check if we are the same user, cant go there!
    if request.user.username == username:
        print 'CREATE THE ME PAGE PLZ'
        return http.HttpResponseRedirect('http://google.com/eatbutts')

    try:
        created, user = get_user_model()\
            .objects.get_or_create_by_username(username)
    except ValueError:
        return http.HttpResponseNotFound(
            "No twitter user with username '%s' exists" % username)

    unfollows = Unfollow.objects.filter(
        user = user,
        public = True)

    return {
        'user': user,
        'unfollows': unfollows
    }


def logout(request):
    """Logout current user and redirect to homepage."""
    auth_logout(request)
    return http.HttpResponseRedirect('/')
