from django.conf import settings
from django.http.response import HttpResponse, HttpResponseBadRequest, JsonResponse
from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView
from factual.download import download_works, download_heroes, download_responses

from .models import Hero, Response, Work
from .serializers import HeroSerializer, ResponseSerializer, WorkSerializer

from io import StringIO


class WorkViewSet(ModelViewSet):
    serializer_class = WorkSerializer
    queryset = Work.objects.all()


class HeroViewSet(ModelViewSet):
    serializer_class = HeroSerializer
    queryset = Hero.objects.all()


class ResponseViewSet(ModelViewSet):
    serializer_class = ResponseSerializer
    queryset = Response.objects.all()


def voyant_url_view(request):
    return JsonResponse({'url': settings.VOYANT_URL})

class DownloadView(APIView):
    def get(self, request, name, format=None):
        data_funcs = {
            'works': download_works,
            'heroes': download_heroes,
            'responses': download_responses
        }
        
        if name in data_funcs:
            stream = StringIO()
            data = data_funcs[name]()
            stream.write(data)
            filename = 'mapyourheroine-{}.tsv'.format(name)
            response = HttpResponse(stream.getvalue(), content_type='text/plain')
            response['Content-Disposition'] = 'attachment; filename="{}"'.format(filename)
            return response
        
        return HttpResponseBadRequest()
