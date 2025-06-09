from django.urls import path
from .views import UserLogin, UserLogout, UserView, MyTokenObtainPairView, UserRegister, ActivateAccountAPIView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


urlpatterns = [
    # to add register view !!
    path('register/', UserRegister.as_view(), name='register'),
    path('activate/<uidb64>/<token>/', ActivateAccountAPIView.as_view(), name='activate'),
    path('login', UserLogin.as_view(), name='login'),
    path('logout', UserLogout.as_view(), name='logout'),
    path('user', UserView.as_view(), name='user'),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
