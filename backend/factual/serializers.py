from rest_framework.serializers import ModelSerializer
from .models import Hero, Work


class WorkSerializer(ModelSerializer):
    class Meta:
        model = Work
        fields = ('id', 'title', 'author', 'medium', 'pub_year',
                  'pub_country', 'is_source', 'adaptation_of', 'environment')


class HeroSerializer(ModelSerializer):
    class Meta:
        model = Hero
        fields = '__all__'
