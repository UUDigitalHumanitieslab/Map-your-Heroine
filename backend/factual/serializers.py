from rest_framework.serializers import ModelSerializer
from .models import Hero, Work


class WorkSerializer(ModelSerializer):
    class Meta:
        model = Work
        fields = '__all__'


class HeroSerializer(ModelSerializer):
    class Meta:
        model = Hero
        fields = '__all__'
