from django.conf.urls.defaults import patterns, url

from . import views


urlpatterns = patterns('',
    url(r'^-/opt-out$', views.opt_out, name='opt-out'),
)
