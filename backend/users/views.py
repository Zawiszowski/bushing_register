from typing import Any
from django.contrib.auth import get_user_model, login, logout
from django.core.mail import send_mail
from rest_framework.authentication import SessionAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response 
from rest_framework import permissions, status
from .models import CustomUser
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes
from django.shortcuts import redirect
from django.urls import reverse
from django.contrib.sites.shortcuts import get_current_site
from django.conf import settings
from django.contrib.auth.tokens import default_token_generator


from rest_framework_simplejwt.views import TokenObtainPairView

from .serializers import UserLoginSerializer, UserSerializer, MyTokenObtainPairSerializer, UserRegisterSerializer

UserModel = get_user_model()

class UserRegister(APIView):

    """
    API endpoint for user registration.
    Creates a new user, deactivates the account, and sends an activation email with a token.
    """
    def post(self, request):
        serializer = UserRegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            user.is_active = False  # Deactivate the user until email is confirmed
            user.save()

            # Generate UID and activation token
            uid = urlsafe_base64_encode(force_bytes(user.pk))
            token = default_token_generator.make_token(user)

            # Build activation link
            domain = get_current_site(request).domain
            activation_link = f"http://{domain}{reverse('activate', kwargs={'uidb64': uid, 'token': token})}"

            # Send activation email
            send_mail(
                subject='Activate your account',
                message=f'Click the link to activate your account: {activation_link}',
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[user.email],
                fail_silently=False,
            )

            return Response(
                {'message': 'Registration successful. Please check your email to activate your account.'},
                status=status.HTTP_201_CREATED
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ActivateAccountAPIView(APIView):
    """
    API endpoint to activate a user's account using UID and token from the email.
    """
    def get(self, request, uidb64, token):
        try:
            # Decode UID from base64
            uid = urlsafe_base64_decode(uidb64).decode()
            user = UserModel.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, UserModel.DoesNotExist):
            return Response({'error': 'Invalid user identifier.'}, status=status.HTTP_400_BAD_REQUEST)

        # Check if the token is valid
        if default_token_generator.check_token(user, token):
            user.is_active = True
            user.save()
            return Response({'message': 'Account successfully activated.'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Activation link is invalid or has expired.'}, status=status.HTTP_400_BAD_REQUEST)

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
