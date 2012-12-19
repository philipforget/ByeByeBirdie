from django.conf.urls.defaults import patterns, url

from . import views



urlpatterns = patterns('',
    url(r'^$', views.home, name='home'),
    url(r'^logout$', views.logout, name='logout'),
    url(r'^(?P<username>\w+)$', views.user_page, name='user_page'),
)
