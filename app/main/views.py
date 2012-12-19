import logging

from django.contrib.auth import logout as auth_logout
from django.http import HttpResponseRedirect
from django.shortcuts import render

from annoying.decorators import render_to


logger = logging.getLogger(__name__)



@render_to('home.html')
def home(request):
    """Homepage"""
    return {'request': request}



def user_page(request, username):
    """User page"""
    return render(request, 'user.html')


def logout(request):
    """Logout current user and redirect to homepage."""
    auth_logout(request)
    return HttpResponseRedirect('/')
