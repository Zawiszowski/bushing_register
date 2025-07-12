from typing import Any
from django.contrib.auth import get_user_model, login, logout
from django.core.mail import send_mail, EmailMultiAlternatives
from rest_framework.authentication import SessionAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response 
from rest_framework import permissions, status
from .models import CustomUser
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from django.shortcuts import redirect, render
from django.urls import reverse
from django.contrib.sites.shortcuts import get_current_site
from django.conf import settings
from django.contrib.auth.tokens import default_token_generator
from django.template.loader import render_to_string
from django.template import loader



from rest_framework_simplejwt.views import TokenObtainPairView

from .serializers import UserLoginSerializer, UserSerializer, MyTokenObtainPairSerializer, UserRegisterSerializer

UserModel = get_user_model()

class UserResetPassword(APIView):
    """
    API endpoint for user rpassword reset.
    Send to a password reset link to the user email.
    """
    def post(self, request):
        email = request.data.get('email')
        try:
            user = UserModel.objects.get(email=email)
            uid = urlsafe_base64_encode(force_bytes(user.pk))
            token = default_token_generator.make_token(user)

            domain = get_current_site(request).domain
            reset_link = f"http://{domain}{reverse('password-reset-confirm', kwargs={'uidb64': uid, 'token': token})}"

            send_mail(
                subject='Reset your password',
                message=f'Click the link below to reset your password:\n\n{reset_link}',
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[user.email],
                fail_silently=False,
            )
        except UserModel.DoesNotExist:
            pass  # not exposing whether the email exists

        return Response({'message': 'If the email exists, a password reset link has been sent.'})
    
class UserResetPasswordConfirm(APIView):
    """
    Confirms the password, reset and sets newpassword
    """
    def post(self, request, uidb64, token):
        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = UserModel.objects.get(pk=uid)
        except (UserModel.DoesNotExist, ValueError, TypeError, OverflowError):
            return Response({'error': 'Invalid user ID.'}, status=status.HTTP_400_BAD_REQUEST)

        if not default_token_generator.check_token(user, token):
            return Response({'error': 'Invalid or expired token.'}, status=status.HTTP_400_BAD_REQUEST)

        password = request.data.get('password')
        password2 = request.data.get('password2')

        if password != password2:
            return Response({'error': 'Passwords do not match.'}, status=status.HTTP_400_BAD_REQUEST)

        user.set_password(password)
        user.save()

        return Response({'message': 'Password has been reset successfully.'}, status=status.HTTP_200_OK)

def send_activate_account(logo_url, user, activation_link):
    subject='Activate your account'
    from_email = settings.DEFAULT_FROM_EMAIL
    to = [user.email]
    text_content=''
    

    html_content = render_to_string('mail_activate.html', {
        'logo_url': logo_url,
        'activation_link': activation_link,
        'user': user,
    })
    msg = EmailMultiAlternatives(subject, text_content, from_email, to)
    msg.attach_alternative(html_content, "text/html")
    msg.send()

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
            if settings.DEBUG:
                domain = 'localhost:5173'
            # activation_link = f"http://{domain}{reverse('activate', kwargs={'uidb64': uid, 'token': token})}"
            activation_link = f"https://{domain}/front-activate/{uid}/{token}/"
            logo_url = f"https://{domain}/django_static/img/steve.png/"

            # Send activation email
            send_activate_account(logo_url, user, activation_link)

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

def regulations(request):
    return render(request, 'regulations.html')