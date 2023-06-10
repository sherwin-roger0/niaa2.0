
from django.contrib import admin
from django.urls import path
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def niaa_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)

        return JsonResponse(data)
    else:
        return JsonResponse({"error": "Invalid request method"})


urlpatterns = [
    path('admin/', admin.site.urls),
    path('niaa/',niaa_view)
]
