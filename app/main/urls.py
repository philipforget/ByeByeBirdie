from django.conf.urls.defaults import patterns, url

from . import views


dtt = 'django.views.generic.simple.direct_to_template'


urlpatterns = patterns('',
    url(r'^$', views.home, name='home'),
    url(r'^logout$', views.logout, name='logout'),
    url(r'^404$', dtt, {'template': '404.html'}),
    url(r'^500$', dtt, {'template': '500.html'}),
    url(r'^(?P<username>\w+)$', views.user_page, name='user_page'),
)
