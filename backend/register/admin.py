from django.contrib import admin
from .models import BushingRegister, FileModel, ClientModel, ProjectModel, MountingComponentModel

class FileModelAdmin(admin.ModelAdmin):
    list_display = ('pk','bushing',)

    def delete_queryset(self, request, queryset):
        for obj in queryset:
            obj.file.delete()
            obj.delete()
        super().delete_queryset(request, queryset)

class bushingAdmin(admin.ModelAdmin):
    list_display = ('custom_pn', 'client_pn', 'decommissioned', 'storage_locker', 'created_at', 'updated_at')


    fieldsets = (
        (None, {
            'fields': ('project', 'axle', 'custom_pn', 'client_pn', 'decommissioned', 'storage_locker', 'velocity', 'stiffness_x', 'stiffness_y', 'mounting_component', 'created_by', 'updated_by')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    readonly_fields = ('created_at', 'updated_at')



admin.site.register(ClientModel)
admin.site.register(ProjectModel)
admin.site.register(MountingComponentModel)
admin.site.register(FileModel, FileModelAdmin)
admin.site.register(BushingRegister, bushingAdmin)

