from django.contrib.auth.base_user import BaseUserManager
from django.utils.translation import gettext_lazy as _

class CustomUserManager(BaseUserManager):
    """
    Custom user model manager where email is the unique identifiers.
    Authentication is from LDAP3 site
    Passwords in djnago project won't be stored

    """
    def create_user(self, email, password=None, **kwargs):
        """
        Create and save a user with the given email and password
        """
        #TODO check for duplicate or is it implemented in inherited class?

        if not email:
            raise ValueError(_("The Email must be set"))
        email = self.normalize_email(email)

        user = self.model(email=email, **kwargs)
        user.set_password(password)

        user.save()
        return user
    
    def create_superuser(self, email, password=None, **kwargs):
        """
        Create and save a SuperUser with the given email and password.
        """    
        kwargs.setdefault("is_staff", True)
        kwargs.setdefault("is_superuser", True)
        kwargs.setdefault("is_active", True)
        
        if kwargs.get("is_staff") is not True:
            raise ValueError(_("Speruser must have is_staff=True."))
        if kwargs.get("is_superuser") is not True:
            raise ValueError(_("Superuser must have is_superuser=True."))
        return self.create_user(email, password, **kwargs)