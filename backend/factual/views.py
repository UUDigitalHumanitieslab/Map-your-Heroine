from django.conf import settings
from django.http.response import JsonResponse
from rest_framework.viewsets import ModelViewSet

from .models import Hero, Response, Work
from .serializers import HeroSerializer, ResponseSerializer, WorkSerializer


class WorkViewSet(ModelViewSet):
    serializer_class = WorkSerializer
    queryset = Work.objects.all()


class HeroViewSet(ModelViewSet):
    serializer_class = HeroSerializer
    queryset = Hero.objects.all()


class ResponseViewSet(ModelViewSet):
    serializer_class = ResponseSerializer
    queryset = Response.objects.all()


def voyant_url_view(request):
    return JsonResponse({'url': settings.VOYANT_URL})
