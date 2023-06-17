from django.db import models

# Create your models here.
class Chats(models.Model):
    user_chat = models.CharField(max_length=3000)
    bot = models.CharField(max_length=3000,default=None)

    def __str__(self):
        return "Niaa_Chats"