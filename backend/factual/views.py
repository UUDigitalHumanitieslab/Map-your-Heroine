from django.db.models.base import Model
from rest_framework.viewsets import ModelViewSet
from .serializers import HeroSerializer, ResponseSerializer, WorkSerializer
from .models import Hero, Response, Work


class WorkViewSet(ModelViewSet):
    serializer_class = WorkSerializer
    queryset = Work.objects.all()


class HeroViewSet(ModelViewSet):
    serializer_class = HeroSerializer
    queryset = Hero.objects.all()


class ResponseViewSet(ModelViewSet):
    serializer_class = ResponseSerializer
    queryset = Response.objects.all()
