from django.conf.urls import patterns, include, url
from django.contrib import admin

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()



urlpatterns = patterns('',
    url(r'^$', include('main.urls', namespace='main')),
    url(r'^auth/', include('social_auth.urls', namespace='social')),
)
