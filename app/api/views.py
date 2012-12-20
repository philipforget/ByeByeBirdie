from annoying.decorators import ajax_request
from django.contrib.auth.decorators import login_required
from django.http import HttpResponseNotAllowed, HttpResponseBadRequest
from django.views.decorators.csrf import csrf_exempt



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


@login_required
@ajax_request
@csrf_exempt
def unfollow(request):
    if request.method != 'POST':
        return HttpResponseNotAllowed(
            'Accepted methods: POST')
    
    if request.POST.get('username', None) is None:
        return HttpResponseBadRequest(
            'no "username" post paramater found')

    if request.POST.get('message', None) is None:
        return HttpResponseBadRequest(
            'no "message" post paramater found')
    
    try:
        unfollow = request.user.unfollow(
            request.POST['username'], request.POST['message'])

    except Exception as e:
        print e
        return HttpResponseBadRequest(
            'Error creating unfollow. You must be following the user')

    return {
        'success': True,
        'unfollow': unfollow.serialize()
    }
