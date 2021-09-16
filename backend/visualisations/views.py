from django.shortcuts import render
from rest_framework.views import APIView
from visualisations.plotting import Plots
from bokeh.core import json_encoder
from bokeh.embed import json_item
from rest_framework.decorators import api_view
from rest_framework.response import Response

PLOT_NAMES = {
    'mediumplot': Plots.medium_plot,
    'ageplot': Plots.age_plot,
    'genderplot': Plots.gender_plot, 
    'roleplot': Plots.role_plot,
    'narratorplot': Plots.narrator_plot,
    'focaliserplot': Plots.focaliser_plot,
}

class PlotView(APIView):
    def get(self, request, name, format=None):
        p = PLOT_NAMES[name]()
        json = json_item(p, name)
        return Response(json)
    
    def post(self, request, name, format=None):
        filters = request.data
        p = PLOT_NAMES[name](filters)
        json = json_item(p, name)
        return Response(json)
