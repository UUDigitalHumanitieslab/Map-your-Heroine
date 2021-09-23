from rest_framework.views import APIView
from visualisations.plotting import Plots
from bokeh.embed import json_item
from rest_framework.response import Response

PLOT_NAMES = {
    'mediumplotdata': Plots.medium_plotdata,
    'pubcountryplotdata': Plots.pubcountry_plotdata,
    'environmentplotdata': Plots.environment_plotdata,
    'ageplotdata': Plots.age_plotdata,
    'genderplotdata': Plots.gender_plotdata,
    'roleplotdata': Plots.role_plotdata,
    'narratorplotdata': Plots.narrator_plotdata,
    'focaliserplotdata': Plots.focaliser_plotdata,
}

class PlotView(APIView):
    def get(self, request, name, format=None):
        json = PLOT_NAMES[name]()
        return Response(json)
    
    def post(self, request, name, format=None):
        filters = request.data
        json = PLOT_NAMES[name](filters)
        return Response(json)
