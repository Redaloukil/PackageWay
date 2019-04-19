from rest_framework import serializers
from backend.users.serializers import UserSerializer
from backend.packages.models import Package


class PackageSerializer(serializers.ModelSerializer):
    # user = UserSerializer()

    class Meta:
        model = Package
        fields = ('id','title' , 'body' , 'longitude' , 'largitude')


class PackageSerializerCreate(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Package
        fields = '__all__'


class PackageSerializerUpdate(serializers.ModelSerializer):

    class Meta:
        model = Package
        exclude = ('user',)

    def validate(self, data):
        """
        Validate authenticated user
        """

        if self.instance.user != self.context['request'].user:
            raise serializers.ValidationError('You can not edit package from other users')
        return data



class PackageSerializerPerUser(serializers.ModelSerializer):

    class Meta:
        model = Package
        exclude = ('user',)
        

    