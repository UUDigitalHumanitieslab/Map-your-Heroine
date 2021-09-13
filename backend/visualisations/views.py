from django.shortcuts import render
from rest_framework.views import APIView
from visualisations.plotting import example_plot
from bokeh.core import json_encoder
from bokeh.embed import json_item
from rest_framework.decorators import api_view
from rest_framework.response import Response

class PlotView(APIView):
    def get(self, request, format=None):
        p = example_plot()
        json = json_item(p, "exampleplot")
        return Response(json)