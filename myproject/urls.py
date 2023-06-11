
from django.contrib import admin
from django.urls import path
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt,csrf_protect
import os

@csrf_exempt
def niaa_view(request):
    os.environ["OPENAI_API_KEY"] = "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"
    if request.method == 'POST':
        from llama_index import StorageContext, load_index_from_storage
        storage_context = StorageContext.from_defaults(persist_dir="myproject/AI")
        index = load_index_from_storage(storage_context)
        query_engine = index.as_query_engine() 
        query = request.body.decode('utf-8')
        response = query_engine.query(query)

        return JsonResponse({"response":response.response})
    else:
        return JsonResponse({"error": "Invalid request method"})

urlpatterns = [
    path('admin/', admin.site.urls),
    path('niaa/',niaa_view)
]
