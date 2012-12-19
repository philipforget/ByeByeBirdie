from django.conf.urls.defaults import patterns, url

urlpatterns = patterns('main.views',
    url(r'^/?$', 'home', name='home'),
    url(r'^(?P<username>\w+)/?$', 'user_page', name='user_page'),
)