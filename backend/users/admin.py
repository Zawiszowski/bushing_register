from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import CustomUser


# Creating admin panel 

class CustomUserAdminConfig(UserAdmin):
    # ordering, list_display, etc..
    search_fields = ('email',)
    ordering = ('email',)
    list_display = ( "email", 'pk', "first_name", "last_name", "is_staff")

    fieldsets =(
        (None, {'fields': ('email', 'password')}),
        ('Personal info', {'fields': ('first_name', 'last_name')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
        )

# admin.site.register(Profile)
admin.site.register(CustomUser, CustomUserAdminConfig)

