from rest_framework import serializers
from .models import User
from rest_framework.authtoken.models import Token
from django.contrib.auth.password_validation import validate_password



class TokenSerializer(serializers.ModelSerializer):
    token = serializers.CharField(source='key')

    class Meta:
        model = Token
        fields = ("token",)

class ResetPasswordSerializer(serializers.Serializer):
    password = serializers.CharField(max_length=255)
    code = serializers.CharField(max_length=255)

class UserSerializerCreate(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username','first_name','last_name','password' , 'user_type' )

    @staticmethod
    def validate_password(password):
        """
        Validate password
        """

        validate_password(password)
        return password



class UserSerializer(serializers.ModelSerializer):
    token = serializers.SerializerMethodField()

    @staticmethod
    def get_token(user):
        """
        Get or create token
        """

        token, created = Token.objects.get_or_create(user=user)
        return token.key

    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'user_type', 'token' , 'is_active', 'password' , 'is_staff')


class UserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username','first_name', 'last_name', 'password')


class UserLoginSerializer(serializers.Serializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'user_type', 'token' , 'is_active', 'password' , 'is_staff')


