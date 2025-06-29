from rest_framework import serializers

from .models import BushingRegister, FileModel, ClientModel, ProjectModel, MountingComponentModel

class ProjectModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectModel
        fields = '__all__'


class ClientModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClientModel
        fields = '__all__'

class MountingComponentSerializer(serializers.ModelSerializer):
    class Meta:
        model = MountingComponentModel
        fields = '__all__'


class FileModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = FileModel
        fields = ['file']


class bushingSerializer(serializers.ModelSerializer):
    photos = FileModelSerializer(read_only=True, many=True)
    project = ProjectModelSerializer(read_only=True)
    mounting_component = MountingComponentSerializer(read_only=True)
    project_id = serializers.PrimaryKeyRelatedField(queryset=ProjectModel.objects.all(), source='project')
    class Meta:
        model = BushingRegister
        fields = ('id', 'custom_pn', 'client_pn', 'decommissioned', 'storage_locker', 'velocity', 'stiffness_x', 'stiffness_y', 'created_at', 'updated_at', 'photos', 'project', 'mounting_component', 'comment', 'axle', 'project_id')
        depth = 1

    def validate_stiffness_x(self, value):
        if not isinstance(value, list):
            raise serializers.ValidationError('Value must be a list.')
        if len(value) > 20:
            raise serializers.ValidationError('The list cannot have more than 20 elements.')
        for item in value:
            if not isinstance(item, (int, float)):
                raise serializers.ValidationError('All elements must be numbers (int or float).')
        return value
    
    def validate_stiffness_y(self, value):
        if not isinstance(value, list):
            raise serializers.ValidationError('Value must be a list.')
        if len(value) > 20:
            raise serializers.ValidationError('The list cannot have more than 20 elements.')
        for item in value:
            if not isinstance(item, (int, float)):
                raise serializers.ValidationError('All elements must be numbers (int or float).')
        return value
    
    def validate(self, data):

        photos = self.context['request'].data.getlist('photos')
        max_images = 6
        max_size = 5 * 1024 * 1024  # 5MB in bytes
        allowed_content_type = ['image/jpeg', 'image/png']

        if len(photos) > max_images:
            raise serializers.ValidationError(f'You can upload a maximum of {max_images} images.')

        for image in photos:
            if image.size > max_size:
                raise serializers.ValidationError(f'Each image can be up to 5MB. {image.name} is too large.')
            if image.content_type not in allowed_content_type:
                raise serializers.ValidationError(f"Invalid file format of {image.name}. Allowed formats are JPEG and PNG.")

        return data










