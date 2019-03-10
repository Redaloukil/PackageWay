from django.shortcuts import get_object_or_404
from rest_framework import status
from django.contrib.auth import get_user_model
from .models import ResetPasswordCode
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserSerializer ,UserLoginSerializer, UserSerializerCreate , UserUpdateSerializer
from rest_framework import permissions
from django.core.exceptions import ValidationError

from rest_framework.authtoken.models import Token

User = get_user_model()


class SignupView(APIView):
    authentication_classes = ()
    permission_classes = ()
    serializer_class = UserLoginSerializer

    @staticmethod
    def post(request):
        serializer = UserSerializerCreate(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response(UserSerializerCreate(user).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    authentication_classes = ()
    permission_classes = ()
    serializer_class = UserLoginSerializer

    @staticmethod
    def post(request):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.user
            return Response(data=UserSerializer(user).data,status=status.HTTP_200_OK)
        return Response(data=serializer.errors,status=status.HTTP_200_OK)


class LogoutView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    @staticmethod
    def get(request):
        """
        Remove API token
        """
        print(request.auth)
        token = get_object_or_404(Token, key=request.auth)
        token.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class ResetPasswordView(APIView):
    authentication_classes = ()
    permission_classes = ()

    @staticmethod
    def post(request):
        """
        Reset password using reset password code
        """

        code = request.data.get('code')
        password = request.data.get('password')

        try:
            reset_password_code = get_object_or_404(ResetPasswordCode, code=code)
            user = reset_password_code.user
            user.set_password(password)
            user.save()
            reset_password_code.delete()
            return Response()
        except KeyError:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        except ValidationError as error:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        except ValueError:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class UpdatePasswordView(APIView):
    @staticmethod
    def post(request):
        """
        Update password for authenticated user
        """

        password = request.data.get('password')

        try:
            request.user.set_password(password)
            request.user.save()
            return Response()
        except KeyError:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        except TypeError:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        except ValidationError as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class UserView(APIView):
    @staticmethod
    def get(request):
        if not request.user.is_authenticated:
            user = User.objects.all().order_by['-id']
            return Response(UserSerializer(user).data, status=status.HTTP_200_OK)
        return Response({"error_message": "user does not exist"}, status=status.HTTP_400_BAD_REQUEST)

    @staticmethod
    def post(request):
        serializer = UserSerializerCreate(data=request.data, context={'request': request})
        if serializer.is_valid():
            user = serializer.save()
            user.set_password(serializer.validated_data['password'])
            user.save()
            return Response(UserSerializer(user).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserDetail(APIView):
    @staticmethod
    def get(request, id):
        user = get_object_or_404(User, pk=id)
        return Response(UserSerializer(user).data)

    @staticmethod
    def patch(request, id):
        user = get_object_or_404(User, id=id)
        if user != request.user:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        serializer = UserUpdateSerializer(user, data=request.data, context={'request': request}, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(UserLoginSerializer(serializer.instance).data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_404_NOT_FOUND)
