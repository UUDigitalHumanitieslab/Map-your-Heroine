from rest_framework.views import APIView
from visualisations.plotting import Plots
from rest_framework.response import Response

class PlotView(APIView):
    def get(self, request, name, format=None):
        plots = Plots.all_plotdata()
        return Response(plots)
    
    def post(self, request, name, format=None):
        filters = request.data
        plots = Plots.all_plotdata(filters)
        return Response(plots)
