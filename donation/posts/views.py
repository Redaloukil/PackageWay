from django.shortcuts import render
from posts.models import Posts
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import PostSerializer,PostCreateSerializer

# Create your views here.

class PostView(APIView):

    @staticmethod
    def get(request, id):
        try:
            posts = Posts.objects.get()
            posts_serializers = PostSerializer(data=posts , many=True)
            return Response(data=posts_serializers.data,status=200 )
        except:
            return Response(data={"message"},status=404)
        
    @staticmethod
    def put(request):
        pass

class PostsView(APIView):
    @staticmethod
    def get(request):
        try:
            posts = Posts.objects.get()
            posts_serializers = PostSerializer(data=posts , many=True)
            return Response(data=posts_serializers.data,status=200 )
        except:
            return Response(data={"message"},status=404)

    @staticmethod
    def post(request):
        create_post_serializer = PostCreateSerializer(data=request.data)
        if create_post_serializer.is_valid():
            title = create_post_serializer.data['title']
            body = create_post_serializer.data['body']
            author = request.user
            post = Posts.objects.create(title=title,body=body,author=author)
            return Response(data=create_post_serializer.data,status=201)
        return Response(data=create_post_serializer._errors,status=401)

    
    
