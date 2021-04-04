from django.views.decorators.http import require_http_methods
from rest_framework.decorators import api_view
from django.core.paginator import Paginator
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from users.models import User
from users.serializers import UserLoginSerializer , UserSignupSerializer , UserUpdateSerializer , UserSerializer

class UsersView(APIView):
    permission_classes = [IsAuthenticated]

    @staticmethod
    def get(request):
        users = User.objects.all()
        users_serializer = UserSerializer(users, many=True)
        return Response(users_serializer.data, status=200)

class UserView(APIView):
    permission_classes = [IsAuthenticated]
    
    @staticmethod
    def get(request,id):
        try:
            user = User.objects.filter(id=id).first()
            if not user: 
                return Response({"message":"Ressource does not exist"} ,status=404)
            return Response(UserSerializer(data=user),status=200)
        except IOError:
            return Response({"error":"Server error", "message":"something went wrong, please try again"}, status=502)
    
    @staticmethod
    def put(request, id):
        permission_classes = [IsAuthenticated]

        user = User.objects.get(id=id)
        user_serializer = UserUpdateSerializer(request.data)
        if user_serializer.is_valid:
            first_name = user_serializer.data['first_name']
            last_name = user_serializer.data['last_name']
            new_password = user_serializer.data['new_password']
            previous_password = user_serializer.data['previous_password']
            updated_user = User.objects.create_user(email=user.email , password=user.password)
            return Response(data=updated_user, status=201)
        return Response(data=user_serializer._errors,status=401)
        

    @staticmethod
    def delete(request,id):
        permission_classes = [IsAuthenticated]
        
        user = User.objects.get(id=id)
        user.delete()
        return Response({'message':'user has been succefully deleted'},status=200)
    

class UsersQueryView(APIView):
        """
        Query version of Users view.

        query = {"from":number, perPage:number}
        """
        def get(request):
            query = request.body.query
            if query: 
                pass
            return Response({},status=200)