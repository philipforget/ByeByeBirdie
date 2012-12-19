from django.conf.urls import patterns, include, url
from django.contrib import admin

<<<<<<< HEAD
=======
# Uncomment the next two lines to enable the admin:
from django.contrib import admin
>>>>>>> e13a3943be5bb9745f3c1d5182ffca7283cc79e4
admin.autodiscover()



urlpatterns = patterns('',
    url(r'^$', include('main.urls')),

    url(r'^admin/', include(admin.site.urls)),
    url(r'^auth/', include('social_auth.urls')),
)
