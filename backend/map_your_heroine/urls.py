"""map_your_heroine URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.urls import path, re_path, include
from django.contrib import admin
from django.views.generic import RedirectView

from rest_framework import routers

from .index import index
from .proxy_frontend import proxy_frontend

from example.views import hooray as ExampleView # DELETEME, see below
from factual import views as factual_views
from visualisations import views as vis_views

api_router = routers.DefaultRouter()  # register viewsets with this router
api_router.register('heroes', factual_views.HeroViewSet)
api_router.register('works', factual_views.WorkViewSet)
api_router.register('responses', factual_views.ResponseViewSet)

if settings.PROXY_FRONTEND:
    spa_url = re_path(r'^(?P<path>.*)$', proxy_frontend)
else:
    spa_url = re_path(r'', index)

urlpatterns = [
    path('api/example/', ExampleView), # this is just an example, please delete and utilize router above.
    path('api/voyant-url/', factual_views.voyant_url_view),
    path('api/download/<name>', factual_views.DownloadView.as_view()),
    path('admin', RedirectView.as_view(url='/admin/', permanent=True)),
    path('api', RedirectView.as_view(url='/api/', permanent=True)),
    path('api-auth', RedirectView.as_view(url='/api-auth/', permanent=True)),
    path('admin/', admin.site.urls),
    path('api/', include(api_router.urls)),
    path('api-auth/', include(
        'rest_framework.urls',
        namespace='rest_framework',
    )),

    #plots
    path('api/results/<name>', vis_views.PlotView.as_view()),

    spa_url,  # catch-all; unknown paths to be handled by a SPA
]
