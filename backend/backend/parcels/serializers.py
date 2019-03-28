from rest_framework import serializers
from .models import Parcel


#parcel details
class ParcelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Parcel
        fields = ("owner","title" , "content" , "largitude" , "longitude" )

#create parcel by client
class CreateParcelSerializer(serializers.ModelSerializer):
    title = serializers.CharField(max_length=255)
    content = serializers.CharField(max_length=255)
    largitude = serializers.FloatField()
    longitude = serializers.FloatField()

    def save(self):
        user = None
        request = self.context.get("request")
        if request and hasattr(request, "user"):
            user = request.user
        
        title = self.validated_data['title']
        article = self.validated_data['article']


class UpdateParcelSerializer(serializers.Serializer):
    class Meta:
        model = Parcel
        fields = ("largitude" , "longitude")


