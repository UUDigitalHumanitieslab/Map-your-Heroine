from django.http.response import HttpResponseNotFound
from rest_framework.views import APIView
from visualisations.plotting import Plots
from bokeh.embed import json_item
from rest_framework.response import Response

# plots with their own method
PLOT_NAMES = {
    'mediumplotdata': Plots.medium_plotdata,
    'pubcountryplotdata': Plots.pubcountry_plotdata,
    'environmentplotdata': Plots.environment_plotdata,
    'ageplotdata': Plots.age_plotdata,
    'genderplotdata': Plots.gender_plotdata,
    'roleplotdata': Plots.role_plotdata,
    'narratorplotdata': Plots.narrator_plotdata,
    'focaliserplotdata': Plots.focaliser_plotdata,
    'responsegenderplotdata': Plots.response_gender_plotdata,
}

# likert plots all use the same method
LIKERT_NAMES = [
    'identification_personality',
    'identification_intruiging',
    'identification_wishbelike',
    'appearance_beautiful',
    'appearance_wishlookedlike',
    'appearance_influencefeelings',
    'appearance_impact',
    'appearance_aware',
    'gender_definespersonality',
    'gender_embraces',
    'gender_attempts_expectations',
    'gender_struggles_expectations',
    'agency_responsible',
    'agency_independent',
    'agency_hindered',
    'agency_environment',
    'agency_development',
    'profession_relevant_to_personality',
    'profession_social_status',
    'profession_growth',
    'profession_defines_life',
    'personality_assertive',
    'personality_independent',
    'personality_vain',
    'personality_confident',
    'personality_wellrounded',
    'personality_honest',
    'personality_loyal',
    'personality_cooperative',
]

# methods for counting
COUNT_NAMES = {
    'n-works': Plots.n_works,
    'n-heroes': Plots.n_heroes,
    'n-responses': Plots.n_responses,
}

class PlotView(APIView):
    def get(self, request, name, format=None):
        json = PLOT_NAMES[name]()
        return Response(json)
    
    def post(self, request, name, format=None):
        filters = request.data

        if name in COUNT_NAMES:
            count = COUNT_NAMES[name](filters)
            return Response(count)
        
        underscore_name = name.replace('-', '_').replace('_plotdata', '')
        if underscore_name in LIKERT_NAMES:
            json = Plots.likert_plotdata(underscore_name, filters)
            return Response(json)

        if name in PLOT_NAMES:
            json = PLOT_NAMES[name](filters)
            return Response(json)
        
        return HttpResponseNotFound('{} is not a known plot name'.format(name))