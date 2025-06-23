from django.db import models
from django.contrib.auth import get_user_model

from django.core.exceptions import ValidationError

UserModel = get_user_model()


def validate_stiffness(value):
    if not isinstance(value, list):
        raise ValidationError('Value must be a list.')
    if len(value) > 20:
        raise ValidationError('The list cannot have more than 20 elements.')
    for item in value:
        if not isinstance(item, (int, float)):
            raise ValidationError('All elements must be numbers (int or float).')
        

def validate_file_size(file):
    max_size = 5  # 5 MB
    if file.size > max_size * 1024 * 1024:
        raise ValidationError(f"File size can not exceed {max_size} MB.")

def validate_file_format(file):
    allowed_types = ['image/jpeg', 'image/png']
    if file.content_type not in allowed_types:
        raise ValidationError("Invalid file format. Allowed formats are JPEG and PNG.")


def get_default_x_list():
    return [-2400,-2000,-1500,-800,-200,0,200,800,1500,2000,2400]
def get_default_y_list():
    return [1200,1000,850,800,820,850,800,780,800,850,1100]


class TimeStampMixin(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class ClientModel(models.Model):
    name = models.CharField(unique=True, max_length=25)
    def __str__(self):
        return self.name

class ProjectModel(models.Model):
    name = models.CharField(unique=True, max_length=25)
    client = models.ForeignKey(ClientModel, on_delete=models.CASCADE, blank=True, null=True )
    def __str__(self):
        return f'{self.client.name} - {self.name}'

class MountingComponentModel(models.Model):


    name = models.CharField(unique=True, max_length=25)
    

    def __str__(self):
        return self.name
    

class BushingRegister(TimeStampMixin):
    class Axle_fields(models.TextChoices):
        REAR = 'Rear'
        FRONT = 'Front'

    project = models.ForeignKey(ProjectModel, on_delete=models.SET_NULL, blank=True, null=True, related_name='project')

    custom_pn=models.CharField(unique=True, max_length=100)
    client_pn = models.CharField(max_length=500, blank=True, null=True)
    decommissioned = models.BooleanField(default=False)
    storage_locker=models.CharField(max_length=100)
    axle = models.CharField(max_length=5, choices=Axle_fields.choices, default=Axle_fields.FRONT)

    #static stiffnes
    velocity = models.FloatField(default=0.53, max_length=10)
    stiffness_x = models.JSONField(default=get_default_x_list, validators=[validate_stiffness]) 
    stiffness_y = models.JSONField(default=get_default_y_list, validators=[validate_stiffness]) 
    mounting_component = models.ForeignKey(MountingComponentModel, on_delete=models.SET_NULL, blank=True, null=True, related_name='mounting_component')

    comment = models.CharField(max_length=500, blank=True, null=True)

    created_by = models.ForeignKey(UserModel, related_name='created_by', on_delete=models.CASCADE)
    updated_by = models.ForeignKey(UserModel, related_name='updated_by', on_delete=models.SET_NULL, null=True, blank=True)
    

    def save(self, *args, **kwargs):

        if self.custom_pn:
            self.custom_pn = self.custom_pn.lower()
        if self.client_pn:
            self.client_pn = self.client_pn.lower()
        if self.storage_locker:
            self.storage_locker = self.storage_locker.lower()

        super(BushingRegister, self).save(*args, **kwargs)


    def __str__(self):
        return self.custom_pn
    
    
class FileModel(models.Model):
    bushing = models.ForeignKey(BushingRegister, related_name='photos', on_delete=models.CASCADE)
    file = models.FileField(upload_to='photos/', validators=[validate_file_format, validate_file_size])
