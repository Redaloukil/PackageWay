from rest_framework import serializers
from .models import Posts

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Posts
        fields = ['title','body','author']

class PostCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Posts
        fields = ['title','body']

