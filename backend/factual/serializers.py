from rest_framework.serializers import ModelSerializer
from rest_framework import serializers

from .models import Hero, Work


class HeroSerializer(ModelSerializer):    
    hobbies = serializers.ListField(child=serializers.CharField(max_length=200), default=[])
    pets = serializers.ListField(child=serializers.CharField(max_length=200), default=[])

    relatives = serializers.ListField(child=serializers.CharField(max_length=200), default=['UNKNOWN'])

    problems = serializers.ListField(child=serializers.CharField(max_length=200), default=[])
    solutions = serializers.ListField(child=serializers.CharField(max_length=200), default=[])

    class Meta:
        model = Hero
        fields = (
            'name', 'work', 
            'role', 'narrator', 'focaliser', 
            'gender', 'age', 'country_origin', 'country_live', 'country_growup', 
            'education', 'profession', 'hobbies', 'pets',
            'appearance', 'sex', 'relatives', 'wealth',
            'problems', 'solutions'
        )

class WorkSerializer(ModelSerializer):
    heroes = HeroSerializer(many=True, read_only=True)

    class Meta:
        model = Work
        fields = ('id', 'title', 'author', 'medium', 'pub_year',
                  'pub_country', 'is_source', 'adaptation_of', 'environment', 'heroes')
