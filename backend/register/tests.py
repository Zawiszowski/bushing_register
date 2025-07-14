from django.test import TestCase
from rest_framework.test import APITestCase, APIClient
from django.urls import reverse
from django.contrib.auth import get_user_model
from django.contrib.auth.models import Permission

from django.contrib.contenttypes.models import ContentType
from register.models import ClientModel

User = get_user_model()

# Create your tests here.
class CreateClientModelTest(APITestCase):
    def setUp(self):
        self.data = {
            'name': 'bmw'
        }
        self.data_wrong = {
            'name': 'bmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmaw'
        }
        self.url = reverse('client-list')
        self.auth_user = User.objects.create_user(email='staff@bob.com', password='HardCorePass1', is_staff=True)
        self.regular_user = User.objects.create_user(email='reg@bob.com', password='HardCorePass1')

        content_type = ContentType.objects.get_for_model(ClientModel)
        permission = Permission.objects.filter(content_type=content_type)
        self.auth_user.user_permissions.add(*permission)

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

class CreateProjectModelTest(APITestCase):
    pass
class CreateMountingComponentModelTest(APITestCase):
    pass
class CreateFileModelTest(APITestCase):
    pass
class CreateBusingRegisterItemTest(APITestCase):
    pass
