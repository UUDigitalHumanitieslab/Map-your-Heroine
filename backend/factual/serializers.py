from rest_framework.serializers import ModelSerializer

from .models import Hero, Work


class HeroSerializer(ModelSerializer):
    class Meta:
        model = Hero
        fields = '__all__'


class WorkSerializer(ModelSerializer):
    heroes = HeroSerializer(many=True, read_only=True)

    class Meta:
        model = Work
        fields = ('id', 'title', 'author', 'medium', 'pub_year',
                  'pub_country', 'is_source', 'adaptation_of', 'environment', 'heroes')
