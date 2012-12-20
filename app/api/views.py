from django.contrib.auth.decorators import login_required
from annoying.decorators import ajax_request


@login_required
@ajax_request
def followers(request):
    force_refresh = request.GET.has_key('force_refresh')

    return {
        "followers": request.user.get_followers(
            force_refresh = force_refresh)
    }
