import logging

from annoying.decorators import render_to
from django.shortcuts import render


logger = logging.getLogger(__name__)



@render_to('home.html')
def home(request):
    """Homepage"""
    return {'request': request}



def user_page(request, username):
    """User page"""
    return render(request, 'user.html')
