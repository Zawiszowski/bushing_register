from rest_framework import serializers, exceptions
from django.contrib.auth import get_user_model, authenticate
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth.models import update_last_login, Group, Permission, UserManager
from django.utils.translation import gettext_lazy as _
from django.core.exceptions import ValidationError
from rest_framework_simplejwt.serializers import TokenObtainSerializer
from rest_framework_simplejwt.settings import api_settings
from rest_framework_simplejwt.tokens import RefreshToken


UserModel = get_user_model()

class UserResetPasswordConfirmerializer(serializers.Serializer):

    email = serializers.EmailField()
    password = serializers.CharField(write_only=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True)

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Passwords are not the same."})
        return attrs
    
class UserRegisterSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True)

    class Meta:
        model = UserModel
        fields= ('email', 'password', 'password2', 'first_name', 'last_name')
    
    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Passwords are not the same."})

        try: 
            user = UserModel.objects.all().get(email=attrs['email'])
            raise serializers.ValidationError({"credentials": "Unable to create account with these credentials."})
        except UserModel.DoesNotExist:
            pass

        return attrs
    
    def create(self, validated_data):
        validated_data.pop('password2')
        user = UserModel.objects.create_user(**validated_data)
        user.is_active = False  # not active berfore activation
        user.save()
        return user


class UserLoginSerializer(serializers.Serializer):

    email = serializers.EmailField()
    password = serializers.CharField()

    def check_user(self, clean_data):
        user = authenticate(username=clean_data['email'], password=clean_data['password'])
        
        if not user:
            # pass
            raise ValidationError(_("Invalid value"), code="invalid")
        
        return user


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ['email']

class PasswordField(serializers.CharField):
    def __init__(self, *args, **kwargs):
        kwargs.setdefault("style", {})

        kwargs["style"]["input_type"] = "password"
        kwargs["write_only"] = True

        super().__init__(*args, **kwargs)

class MyTokenObtainSerializer(serializers.Serializer):
    
    username_field = UserModel.USERNAME_FIELD
    token_class = None

    default_error_messages = {
        "no_active_account": _("No active account found with the given credentials")
    }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        self.fields[self.username_field] = serializers.CharField()
        self.fields["password"] = PasswordField()
        

    def validate(self, attrs):
        authenticate_kwargs = {
            self.username_field: attrs[self.username_field],
            "password": attrs["password"],
        }
        try:
            authenticate_kwargs["request"] = self.context["request"]
        except KeyError:
            pass

        self.user = authenticate(username=attrs[self.username_field], password=attrs["password"])

        if not api_settings.USER_AUTHENTICATION_RULE(self.user):
            raise exceptions.AuthenticationFailed(
                self.error_messages["no_active_account"],
                "no_active_account",
            )

        return {}

    @classmethod
    def get_token(cls, user):
        token =  cls.token_class.for_user(user)

        token['email'] = user.email

        user_groups = list(user.groups.values_list('name',flat = True))
        all_permissions_per_group = []
        for group in user_groups:
            group_permissions = list(Group.objects.get(name=group).permissions.all().values_list('name',flat = True))
            all_permissions_per_group.append(f'{group}:{group_permissions}')
        all_permissions_in_groups = list(Permission.objects.filter(group__user=user).values_list('name',flat = True))
        all_permissions_in_permissions = list(Permission.objects.filter(user=user).values_list('name',flat = True))

        token['groups'] = all_permissions_per_group
        token['permissions'] = list(set(all_permissions_in_groups + all_permissions_in_permissions))
        

        return token
    

class MyTokenObtainPairSerializer(MyTokenObtainSerializer):

    token_class = RefreshToken

    def validate(self, attrs):
        data = super().validate(attrs)

        refresh = self.get_token(self.user)

        data["refresh"] = str(refresh)
        data["access"] = str(refresh.access_token)

        if api_settings.UPDATE_LAST_LOGIN:
            update_last_login(None, self.user)

        return data
