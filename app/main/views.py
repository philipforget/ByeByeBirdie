import logging

from annoying.decorators import render_to
from django import http
from django.contrib.auth import get_user_model
from django.contrib.auth import logout as auth_logout
from django.contrib.auth.decorators import login_required

from .models import Unfollow


logger = logging.getLogger(__name__)



@render_to('home.html')
def home(request):
    """Homepage"""
    return {}


@render_to()
def user_page(request, username):
    """User page

    """
    # Looking at our own unfollows (people who have unfollowed us)
    if request.user.username == username:
        template = 'me.html'
        unfollows = request.user.unfollow_set.all()
        user = request.user

    else:
        template = 'user.html'
        try:
            created, user = get_user_model()\
                .objects.get_or_create_by_username(username)
        except ValueError:
            return http.HttpResponseNotFound(
                "No twitter user with username '%s' exists" % username)

        unfollows = Unfollow.objects.filter(
            user = user,
            public = True,
            is_active = True)

    return {
        'TEMPLATE': template,
        'user': user,
        'unfollows': unfollows
    }


@login_required
@render_to('mine.html')
def mine(request):
    return {
        "unfollows": request.user.unfollowed_by.all()
    }


def logout(request):
    """Logout current user and redirect to homepage."""
    auth_logout(request)
    return http.HttpResponseRedirect('/')
