from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from .models import Parcel
from .serializers import CreateParcelSerializer , ParcelSerializer
from rest_framework.response import Response
from rest_framework import status
from users.models import User

# Create your views here.
class CreateParcelView(APIView):
    def post(self):
        serializer = CreateParcelSerializer(self.request)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_403_FORBIDDEN)

# get parcels list
class ParcelsView(APIView):
    def get(self):
        parcels = Parcel.objects.all().object_by["-id"]
        serializers = ParcelSerializer(data=parcels , many=True)
        if serializers.is_valid():
            return Response(data=serializers.data , status=status.HTTP_200_OK)
        return Response(data=serializers.errors , status=status.HTTP_403_FORBIDDEN)

class UpdateParcelView(APIView):
    def get(self , id):
        parcel = get_object_or_404(Parcel , id=id)
        serializer = ParcelSerializer(data=parcel)
        if serializer.is_valid():
            return Response(data=serializer.data , status=status.HTTP_200_OK)
        return Response(data=serializer.errors, status=status.HTTP_403_FORBIDDEN)

    def patch(self , request, id):
        parcel = get_object_or_404(Parcel, id=id)
        if parcel.owner != self.request.user:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        serializer = UpdateParcelView(data=request.data, context={'request': request}, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_404_NOT_FOUND)

class ParcelPerUserView(APIView):
    def get(self , id ):
        user = get_object_or_404(User , id=id)
        parcels = Parcel.objects.all(owner = user)
        serailizer = ParcelSerializer(parcels , many=True)
        return Response(data=serailizer.data , status=status.HTTP_200_OK)
        