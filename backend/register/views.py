from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication
from .serializers import bushingSerializer, FileModelSerializer, ClientModelSerializer, ProjectModelSerializer, MountingComponentSerializer
from .models import BushingRegister, FileModel, ClientModel, ProjectModel, MountingComponentModel

from .filters import CustomSearchFilter
from rest_framework.decorators import action
import os
from rest_framework.pagination import PageNumberPagination

class CustomPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100

# so far MyDjangoModelPermissions not used. 
# permissions.DjangoModelPermissionsOrAnonReadOnly were used
class MyDjangoModelPermissions(permissions.DjangoModelPermissions):

    authenticated_users_only = False
    perms_map = {
        # 'GET': ['%(app_label)s.view_%(model_name)s'],
        'GET': [],
        'OPTIONS': [],
        'HEAD': [],
        'POST': ['%(app_label)s.add_%(model_name)s'],
        'PUT': ['%(app_label)s.change_%(model_name)s'],
        'PATCH': ['%(app_label)s.change_%(model_name)s'],
        'DELETE': ['%(app_label)s.delete_%(model_name)s'],
    }

class ProjectModelView(viewsets.ModelViewSet):
    permission_classes = [ permissions.DjangoModelPermissionsOrAnonReadOnly,]
    authentication_classes = [ JWTAuthentication ]
    serializer_class = ProjectModelSerializer
    queryset = ProjectModel.objects.all()

    @action(detail=False, methods=['get'])
    def filter(self, request):
        _queryset = self.get_queryset()
        client = request.query_params.get('client', None)

        
        if client is not None:
            _queryset = _queryset.filter(client=client)
        
        serializer = self.get_serializer(_queryset, many=True)
        return Response(serializer.data)

class ClientModelView(viewsets.ModelViewSet):
    permission_classes = [ permissions.DjangoModelPermissionsOrAnonReadOnly,]
    authentication_classes = [ JWTAuthentication ]
    serializer_class = ClientModelSerializer
    queryset = ClientModel.objects.all()

class MountingComponentView(viewsets.ModelViewSet):
    permission_classes = [ permissions.DjangoModelPermissionsOrAnonReadOnly,]
    authentication_classes = [ JWTAuthentication ]
    serializer_class = MountingComponentSerializer
    queryset = MountingComponentModel.objects.all()

class FileModelView(viewsets.ModelViewSet):
    permission_classes = [ permissions.DjangoModelPermissionsOrAnonReadOnly,]
    authentication_classes = [ JWTAuthentication ]
    serializer_class = FileModelSerializer
    queryset = FileModel.objects.all()
        
class bushingView(viewsets.ModelViewSet):
    
    permission_classes = [ permissions.DjangoModelPermissionsOrAnonReadOnly,]
    authentication_classes = [ JWTAuthentication ]
    serializer_class = bushingSerializer
    queryset = BushingRegister.objects.all().order_by('id')
    pagination_class = CustomPagination
    filter_backends = [CustomSearchFilter]
    search_fields = ['custom_pn', 'client_pn', 'storage_locker', 'post_date']

    
    def perform_create(self, serializer):
        name = self.request.data.get('custom_pn')
        files_data = self.request.FILES.getlist('photos')
        # folder_path = os.path.join('photos', name)
        # os.makedirs(folder_path, exist_ok=True)
    
        if not serializer.is_valid():
        # Zapisz obrazy do bazy danych lub wykonaj inne operacje
            return Response({'message': 'error.'}, status=status.HTTP_400_BAD_REQUEST)
            

        my_model = serializer.save(created_by=self.request.user)

        for file_data in files_data:
            file_instance = FileModel(bushing=my_model, file=file_data)
            # file_instance.file.name = os.path.join(folder_path, file_data.name)
            file_instance.save()

    def perform_update(self, serializer):
        instance = self.get_object()
        name = self.request.data.get('custom_pn')
        files_data = self.request.FILES.getlist('photos')
        print(self.request.data)
        # folder_path = os.path.join('photos', name)
        # os.makedirs(folder_path, exist_ok=True)

        if len(files_data) > 0:
            for file_instance in instance.photos.all():
                file_instance.file.delete()
                file_instance.delete()

        
            for file_data in files_data:
                file_instance = FileModel(bushing=instance, file=file_data)
                # file_instance.file.name = os.path.join(folder_path, file_data.name)
                file_instance.save()

        serializer.save(updated_by=self.request.user)

        
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()

        # Usuwanie powiązanych plików
        for file_instance in instance.photos.all():
            file_instance.file.delete()
            file_instance.delete()

        return super().destroy(request, *args, **kwargs)





        
