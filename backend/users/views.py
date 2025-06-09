from typing import Any
from django.contrib.auth import get_user_model, login, logout
from rest_framework.authentication import SessionAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response 
from rest_framework import permissions, status
from .models import CustomUser



from rest_framework_simplejwt.views import TokenObtainPairView

from .serializers import UserLoginSerializer, UserSerializer, MyTokenObtainPairSerializer

class UserRegister(APIView):

    def post(self, request):
        data = request.data



class UserLogin(APIView):
    # permission_classes = [permissions.AllowAny,]
    # authentication_classes = (SessionAuthentication,)

    def post(self, request):
        data = request.data

        serializer = UserLoginSerializer(data=data)
        if serializer.is_valid():
            user = serializer.check_user(data)
            login(request, user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        
class UserLogout(APIView):
    # permission_classes = [permissions.AllowAny,]
    # authentication_classes = (SessionAuthentication,)
    def post(self, request):
        logout(request)
        return Response(status=status.HTTP_200_OK)

class UserView(APIView):
    permission_classes = [permissions.IsAuthenticated,]
    # authentication_classes = (SessionAuthentication,)

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response({'user': serializer.data}, status=status.HTTP_200_OK)

        


class MyTokenObtainPairView(TokenObtainPairView):
    # permission_classes = [permissions.AllowAny,]
    # authentication_classes = (SessionAuthentication,)
    serializer_class = MyTokenObtainPairSerializer
