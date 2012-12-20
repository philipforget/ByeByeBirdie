from annoying.decorators import ajax_request
from django.contrib.auth.decorators import login_required



@login_required
@ajax_request
def me(request):
    return request.user.serialize()


@login_required
@ajax_request
def following(request):
    force_refresh = request.GET.has_key('force_refresh')

    return {
        "following": request.user.get_following(
            force_refresh = force_refresh)
    }
