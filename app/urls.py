from django.conf.urls import patterns, include, url
from django.contrib import admin

admin.autodiscover()



urlpatterns = patterns('',
    (r'^djangoadmin/?', include(admin.site.urls)),
    url(r'', include('main.urls')),
    url(r'', include('account.urls')),
    url(r'^api/v1/', include('api.urls', namespace='api_v1')),
    url(r'^auth/', include('social_auth.urls')),
)
