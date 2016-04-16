from django.conf.urls import url
from . import views
from django.views.generic import RedirectView
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    url(r'^(?P<user_id>[0-9]+)/$', views.index, name='index'),
    url(r'^(?P<user_id>[0-9]+)/profile/', views.profile, name='profile'),
    url(r'^login/', views.login, name='login'),
    url(r'^register/', views.register, name='register'),
    url(r'^authenticateLogin/', views.authenticateLogin,
        name='authenticateLogin'),
    url(r'^authenticateRegister/', views.authenticateRegister,
        name='authenticateRegister'),
    # ex: /polls/5/
    # url(r'^(?P<user_id>[0-9]+)/$', views.detail, name='detail'),
    # ex: /polls/5/results/
    url(r'^(?P<user_id>[0-9]+)/results/$', views.results, name='results'),
    # ex: /polls/5/vote/
    url(r'^(?P<user_id>[0-9]+)/vote/$', views.vote, name='vote'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
