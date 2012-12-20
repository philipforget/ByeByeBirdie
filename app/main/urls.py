from django.conf.urls.defaults import patterns, url
from django.views.generic import TemplateView

from . import views



urlpatterns = patterns('',
    url(r'^$', views.home, name='home'),
    url(r'^logout$', views.logout, name='logout'),
    url(r'^404$', TemplateView.as_view(template_name='404.html')),
    url(r'^500$', TemplateView.as_view(template_name='500.html')),
    url(r'^(?P<username>\w+)$', views.user_page, name='user_page'),
)
