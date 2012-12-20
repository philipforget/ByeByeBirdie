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
    force_refresh = request.GET.has_key('force_refresh')
    existing_unfollow = None

    # Looking at our own unfollows (people who have unfollowed us)
    if request.user.username == username:
        template = 'me.html'
        unfollows = request.user.get_and_cache_list(
            'mine', force_refresh=force_refresh)
        user = request.user

    else:
        template = 'user.html'
        try:
            created, user = get_user_model()\
                .objects.get_or_create_by_username(username)
        except ValueError:
            raise http.Http404

        unfollows = user.get_and_cache_list(
            'unfollows', force_refresh=force_refresh)

        try:
            existing_unfollow = Unfollow.objects.filter(
                user = user,
                unfollowed_by = request.user,
                is_active = True)[0]

            # Dont show your own in the list
            unfollows = unfollows.exclude(id=existing_unfollow.id)

        except (Unfollow.DoesNotExist, IndexError):
            pass

    return {
        'existing_unfollow': existing_unfollow,
        'TEMPLATE': template,
        'user': user,
        'unfollows': unfollows
    }


@login_required
@render_to('mine.html')
def mine(request):
    force_refresh = request.GET.has_key('force_refresh')
    return {
        "unfollows": request.user.get_and_cache_list(
            'mine', force_refresh=force_refresh)
    }


def logout(request):
    """Logout current user and redirect to homepage."""
    auth_logout(request)
    return http.HttpResponseRedirect('/')
