from django.shortcuts import render
from .models import Call
from rest_framework.views import APIView
from .serializers import CallSerializer
# Create your views here.


class CallView(APIView):
    @staticmethod
    def get(request):
        """
        List users
        """

        calls = Call.objects.all().order_by('id')
        return Response(CallSerializer(calls, many=True).data)

    @staticmethod
    def post(request):
        """
        Create user
        """
        serializer = CallSerializer(data=request.data)
        if serializer.is_valid():
            call = serializer.save()
            return Response(CallSerializer(call).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# call/{id}
class CallDetail(APIView):
    @staticmethod
    def get(request, id):
        """
        View individual user
        """

        call = get_object_or_404(Call, pk=id)
        return Response(CallSerializer(call).data)