from rest_framework.permissions import IsAuthenticated
from django.views.decorators.http import require_http_methods
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.authentication import authenticate
from rest_framework.views import APIView
from users.serializers import UserLoginSerializer , UserSignupSerializer
from users.models import User

class LoginView(APIView):
    @staticmethod
    def post(request):
        login_serializer = UserLoginSerializer(data=request.data)
        if login_serializer.is_valid(): 
            email = login_serializer.data['email']
            password = login_serializer.data['password']
        return Response(data=request,status=200)

class SignupView(APIView):
    @staticmethod
    def post(request):
        singup_serializer = UserSignupSerializer(data=request.data)
        if singup_serializer.is_valid():
            email = singup_serializer.data['email']
            first_name = singup_serializer.data['first_name']
            last_name = singup_serializer.data['last_name']
            password = singup_serializer.data['password']
            user = User.objects.create_user(email=email, first_name=first_name, last_name=last_name, password=password)
            if user:
                return Response(data={"message":"You have been succefully registered"} , status=201)
            return Response(data={"message":"Something went wrong, can you try again"})
        return Response(data=singup_serializer._errors , status=401)