from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from backend.packages.models import Package
from backend.packages.serializers import (
    PackageSerializer , 
    PackageSerializerCreate , 
    PackageSerializerPerUser
)

class PackageView(APIView):
    @staticmethod
    def get(request):
        """
        List posts
        """
        packages = Package.objects.all().order_by('-id')
        return Response(PackageSerializer(packages,many=True).data)

    @staticmethod
    def post(request):
        """
        Create post
        """

        serializer = PackageSerializerCreate(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(PackageSerializer(serializer.instance).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PackageDetail(APIView):
    permission_classes = (IsAuthenticated,)    
    @staticmethod
    def get(request, id):
        """
        View Individual Package Details
        """

        post = get_object_or_404(Package, id=id)
        return Response(ParcelSerializer(post).data)

    @staticmethod
    def patch(request, id):
        """
        Update Individual Package Details
        """

        post = get_object_or_404(Package, id=id)
        serializer = PackageSerializerUpdate(post, data=request.data, context={'request': request}, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(PackageSerializer(serializer.instance).data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    @staticmethod
    def delete(request, id):
        """
        Delete Individual Package Details
        """

        parcel = get_object_or_404(Package, pk=id)
        if parcel.user != request.user:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        post.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class PackagesCurrentUserView(APIView):
       
    @staticmethod
    def get(request):
        """
        View All Packages By Current User
        """
        if request.user.is_authenticated:
            packages = Package.objects.filter(user=request.user)
            return Response(data=PackageSerializerPerUser(packages , many=True).data,status=status.HTTP_200_OK)
        return Response({'authentification':'you are authenticated'})


class PackagesNotRecoveredCurrentUserView(APIView):
    @staticmethod
    def get(request):
        """
        View Recovered Packages By Current User
        """
        if request.user.is_authenticated:
            packages = Package.objects.filter(user=request.user ,recovered=False)
            return Response(data=PackageSerializerPerUser(packages , many=True).data,status=status.HTTP_200_OK)
        return Response({'authentification':'you are authenticated'})


class PackagesRecoveredCurrentUserView(APIView):
    @staticmethod
    def get(request):
        """
        View Not Yet Recovered Packages By Current User
        """
        if request.user.is_authenticated:
            packages = Package.objects.filter(user=request.user , recovered=True)
            return Response(data=PackageSerializerPerUser(packages , many=True).data,status=status.HTTP_200_OK)
        return Response({'authentification':'you are authenticated'})

class PackageRecoveredByDelivery(APIView):
    @staticmethod
    def post(request , id):
        """
        Delivery Man Gets The Package By Id
        """
        if request.user.is_authenticated:
            if request.user.user_type == "1":
                package = get_object_or_404(Package , id=id)
                package.recovered = True
                package.save()
                return Response(data=PackageView(parcel).data,status=status.HTTP_202_ACCEPTED)
            return Response({'authentification':'you are not authenticated'} , status=status.HTTP_401_UNAUTHORIZED)
        return Response({'authentification':'you are not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)



