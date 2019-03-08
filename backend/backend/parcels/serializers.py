from rest_framework import serializers
from .models import Parcel


#parcel details
class ParcelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Parcel
        fields = ()

#create parcel by client
class CreateParcelSerializer(serializers.ModelSerializer):
    pass


#get parcel by delivery man


