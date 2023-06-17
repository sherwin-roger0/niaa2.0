
from django.contrib import admin
from django.urls import path
from django.http import JsonResponse
from django.db import connection
import json
from django.views.decorators.csrf import csrf_exempt
import os

@csrf_exempt
def niaa_view(request):
    os.environ["OPENAI_API_KEY"] = "API-KEY"
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

@csrf_exempt
def save_chat_view(request):
    if request.method == 'POST':
        user_message = json.loads(request.body.decode('utf-8'))["user_message"]
        bot_response = json.loads(request.body.decode('utf-8'))['bot_response']
        
        with connection.cursor() as cursor:
                cursor.execute(
                    "INSERT INTO myapp_chats (user_chat, bot) VALUES (%s, %s)",
                    [user_message, bot_response]
                )
        
        return JsonResponse({'response':'Chat saved successfully.'})
    
    return JsonResponse({'response':'Invalid request method.'})

urlpatterns = [
    path('admin/', admin.site.urls),
    path('niaa/',niaa_view),
    path('save/',save_chat_view)
]
