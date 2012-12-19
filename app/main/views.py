import logging

from django.shortcuts import render


logger = logging.getLogger(__name__)



def home(request):
    """Homepage"""
    if not request.user.is_authenticated():
        return render(request, 'home.html')
    else:
        # dafuq we do here?
        pass



def user_page(request, username):
    """User page"""
    return render(request, 'user.html')
