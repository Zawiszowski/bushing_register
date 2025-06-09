from django.db import models

from django.utils import timezone
from django.contrib.auth.models import  AbstractBaseUser, PermissionsMixin, UserManager
from .managers import CustomUserManager
from django.utils.translation import gettext_lazy as _

# Custom model scheme
class CustomUser(AbstractBaseUser, PermissionsMixin):
    
    username = None
    email = models.EmailField(_("email address"), unique=True)
    first_name = models.CharField(max_length=100, default='first name')
    last_name = models.CharField(max_length=100, default='last name')
    USERNAME_FIELD = 'email'

    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(default=timezone.now)
    
    
    REQUIRED_FIELDS = []
    objects = CustomUserManager()
    
    
    def __str__(self) -> str:
        return self.email