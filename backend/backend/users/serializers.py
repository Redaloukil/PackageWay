from rest_framework import serializers
from .models import User
from rest_framework.authtoken.models import Token
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth import authenticate


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
        fields = ('username','first_name','last_name','password')

    @staticmethod
    def validate_password(password):
        """
        Validate password
        """

        validate_password(password)
        return password

    def validate(self, attrs):
        return 0




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
        fields = ('id', 'username', 'first_name', 'last_name', 'user_type', 'token')


class UserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username','first_name', 'last_name', 'password')


class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True)

    default_error_messages = {
        'wrong_credetials':'You submitted wrong credentials ',
        'inactive_account': 'User account is disabled.',
        'invalid_credentials': 'Wrong username or password.',
    }

    def __init__(self, *args, **kwargs):
        super(UserLoginSerializer, self).__init__(*args, **kwargs)
        self.user = None

    def validate(self, attrs):
        username = attrs.get("username")
        password = attrs.get("password")
        if not username and not password:
            raise serializers.ValidationError(self.error_messages['wrong_credetials'])

        self.user = authenticate(self, username=attrs.get("username"), password=attrs.get("password"))

        if self.user:
            if not self.user.is_active:
                raise serializers.ValidationError(self.error_messages['inactive_account'])
            return attrs
        else:
            raise serializers.ValidationError(self.error_messages['invalid_credentials'])
