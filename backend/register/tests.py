from django.test import TestCase
from rest_framework.test import APITestCase, APIClient
from django.urls import reverse
from django.contrib.auth import get_user_model
from django.contrib.auth.models import Permission, AbstractBaseUser
from django.db import models

from django.contrib.contenttypes.models import ContentType
from register.models import ClientModel, ProjectModel, MountingComponentModel, FileModel

User = get_user_model()

def permissionsApply(user: AbstractBaseUser, *models: models.Model):
    perms = []
    for model in models:
        ct_client = ContentType.objects.get_for_model(model)
        perms.extend(Permission.objects.filter(content_type=ct_client))
    user.user_permissions.add(*perms)

    return user

class BaseTestSetup(APITestCase):
    @classmethod
    def setUpTestData(cls):
        # user create 
        cls.auth_user = User.objects.create_user(email='staff@bob.com', password='HardCorePass1', is_staff=True)
        cls.regular_user = User.objects.create_user(email='reg@bob.com', password='HardCorePass1')


class CreateClientModelTest(BaseTestSetup):
    def setUp(self):
        self.data = {
            'name': 'bmw'
        }
        self.data_wrong = {
            'name': 'bmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmaw'
        }
        self.url = reverse('client-list')
        permissionsApply(self.auth_user, ClientModel)

    def test_client_get(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 200)

    def test_client_create_with_permissions(self):
        self.client.force_authenticate(user=self.auth_user)
        response = self.client.post(self.url, self.data, format='json')
        response_wrong = self.client.post(self.url, self.data_wrong, format='json')
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response_wrong.status_code, 400)

    def test_client_create_without_permissions(self):
        self.client.force_authenticate(user=self.regular_user)
        response = self.client.post(self.url, self.data, format='json')
        self.assertEqual(response.status_code, 403)

class CreateProjectModelTest(BaseTestSetup):
    def setUp(self):
        self.client_data = {
            'name': 'bmw'
        }

        permissionsApply(self.auth_user, ClientModel, ProjectModel)
        self.client.force_authenticate(user=self.auth_user)

        self.client_url = reverse('client-list')
        self.project_url = reverse('project-list')
        
        response = self.client.post(self.client_url, self.client_data, format='json')
        self.project_data = {
            'name': 'g2x',
            'client': response.data['id']
        }
    def test_project_create_with_perms(self):
        response = self.client.post(self.project_url, self.project_data, format='json')
        self.assertEqual(response.status_code, 201)
    
    def test_project_create_without_perms(self):
        self.client.force_authenticate(user=self.regular_user)
        response = self.client.post(self.project_url, self.project_data, format='json')
        self.assertEqual(response.status_code, 403)

class CreateMountingComponentModelTest(BaseTestSetup):
    def setUp(self):
        self.data = {
            'name': 'wishbone'
        }
        self.data_wrong = {
            'name': 'wishboneeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
        }
        self.url = reverse('mounting_component-list')
        permissionsApply(self.auth_user, MountingComponentModel)

    def test_mc_get(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 200)

    def test_mc_create_with_permissions(self):
        self.client.force_authenticate(user=self.auth_user)
        response = self.client.post(self.url, self.data, format='json')
        response_wrong = self.client.post(self.url, self.data_wrong, format='json')
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response_wrong.status_code, 400)

    def test_mc_create_without_permissions(self):
        self.client.force_authenticate(user=self.regular_user)
        response = self.client.post(self.url, self.data, format='json')
        self.assertEqual(response.status_code, 403)

class CreateBusingRegisterItemTest(APITestCase):
    pass

class CreateFileModelTest(APITestCase):
    pass
