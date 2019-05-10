from django.contrib.auth import authenticate
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from backend.users.models import User , Profile
from backend.users.serializers import (
    UserSerializer ,
    UserSerializerCreate , 
    UserSerializerUpdate ,
    UserSerializerLogin
)


# login
class LoginView(APIView):
    authentication_classes = ()
    permission_classes = ()

    @staticmethod
    def post(request):
        """
        Get user data and API token
        """

        user = get_object_or_404(User, username=request.data.get('username'))
        user = authenticate(username=user.username, password=request.data.get('password'))
        if user:
            serializer = UserSerializerLogin(user)
            return Response(serializer.data)
        return Response(status=status.HTTP_400_BAD_REQUEST)

# logout
class LogoutView(APIView):
    

    @staticmethod
    def get(request):
        """
        Remove API token
        """

        token = get_object_or_404(Token, key=request.auth)
        token.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# users
class UserView(APIView):
       
    @staticmethod
    def get(request):
        """
        List users
        """

        users = User.objects.all().order_by('id')
        return Response(UserSerializer(users, many=True).data)

    @staticmethod
    def post(request):
        """
        Create user
        """

        serializer = UserSerializerCreate(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            user.set_password(serializer.validated_data['password'])
            user.save()
            Profile(user=user).save()
            return Response(UserSerializer(user).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# users/{id}
class UserDetail(APIView):
        
    @staticmethod
    def get(request, id):
        """
        View individual user
        """

        user = get_object_or_404(User, pk=id)
        return Response(UserSerializer(user).data)

    @staticmethod
    def put(request, id):
        """
        Update authenticated user
        """
        user = get_object_or_404(User, pk=id)
        if user != request.user:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        serializer = UserSerializerUpdate(user, data=request.data, context={'request': request}, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(UserSerializerLogin(serializer.instance).data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @staticmethod
    def delete(request, id):
        """
        Delete user
        """
        user = get_object_or_404(User, pk=id)
        if user.is_superuser:
            return Response({
                constants.ERROR: 'That user can not be deleted'
            }, status=status.HTTP_401_UNAUTHORIZED)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class GetCurrentUser(APIView):
       
    @staticmethod
    def get(request):
        if request.user.is_authenticated : 
            user = get_object_or_404(User , id=request.user.id)
            if user :
                serializer = UserSerializer(user)
                return Response(data=serializer.data ,status=status.HTTP_200_OK)
            return Response(status=status.HTTP_204_NO_CONTENT) 
        return Response({'authentification':'you are authenticated'})
        