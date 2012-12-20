from django.conf.urls.defaults import patterns, url

from . import views



urlpatterns = patterns('',
    url(r'^me$', views.me, name='me'),
    url(r'^me/following$', views.following, name='following'),
)
