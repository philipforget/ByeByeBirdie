import logging

from annoying.decorators import render_to
from django import http
from django.contrib.auth import get_user_model
from django.contrib.auth import logout as auth_logout
from django.contrib.auth.decorators import login_required

from .forms import UnfollowForm
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
    existing_unfollow = None
    force_refresh = request.GET.has_key('force_refresh')
    form = None

    # Looking at our own unfollows (people who have unfollowed us)
    if request.user.username == username:
        user = request.user
        template = 'me.html'
        if user.is_opted_out:
            return {
                'TEMPLATE': template,
                'user': user,
            }

        unfollows = request.user.get_and_cache_list(
            'unfollowed', force_refresh=force_refresh)

    else:
        template = 'user.html'

        try:
            created, user = get_user_model()\
                .objects.get_or_create_by_username(username)
        except ValueError:
            raise http.Http404

        if user.is_opted_out:
            return {
                'TEMPLATE': template,
                'user': user,
            }

        if request.method == 'POST':
            form = UnfollowForm({
                'message': request.POST.get('message', None),
                'user': user.id,
                'unfollowed_by': request.user.id,
            })

            if form.is_valid():
                try:
                    request.user.unfollow(
                        user.username,
                        form.cleaned_data['message'])

                # If the friendship doesnt exist, fuck it
                except ValueError:
                    pass

                return http.HttpResponseRedirect(request.path)

        unfollows = user.get_and_cache_list(
            'unfollows', force_refresh=force_refresh)

        try:
            # Dont try to pull an existing unfollow for an opted out user
            if request.user.is_authenticated() and not request.user.is_opted_out:
                existing_unfollow = Unfollow.objects.filter(
                    user = user,
                    unfollowed_by = request.user,
                    is_active = True)[0]

        except (Unfollow.DoesNotExist, IndexError):
            if form is None:
                form = UnfollowForm()

    return {
        'form': form,
        'existing_unfollow': existing_unfollow,
        'TEMPLATE': template,
        'user': user,
        'unfollows': unfollows
    }


@login_required
@render_to('mine.html')
def mine(request):
    if request.user.is_opted_out:
        return {}

    force_refresh = request.GET.has_key('force_refresh')

    return {
        "unfollows": request.user.get_and_cache_list(
            'mine', force_refresh=force_refresh)
    }


def logout(request):
    """Logout current user and redirect to homepage."""
    auth_logout(request)
    return http.HttpResponseRedirect('/')
