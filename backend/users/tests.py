from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth import get_user_model
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.contrib.auth.tokens import default_token_generator

User = get_user_model()

class RegistrationTests(APITestCase):
    def setUp(self):
        self.register_url = reverse('register')

    def test_user_registration_success(self):
        """
        Should create a new inactive user and send activation email.
        """
        data = {
            'email': 'test@example.com',
            'password': 'StrongPass123',
            'password2': 'StrongPass123',
            'first_name': 'Test',
            'last_name': 'User'
        }
        response = self.client.post(self.register_url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        user = User.objects.get(email='test@example.com')
        self.assertFalse(user.is_active)

    def test_password_mismatch(self):
        """
        Should return error if passwords don't match.
        """
        data = {
            'email': 'wrong@example.com',
            'password': 'Password123',
            'password2': 'DifferentPass',
        }
        response = self.client.post(self.register_url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('password', response.data)


class ActivationTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            email='inactive@example.com',
            password='Password123',
            is_active=False
        )
        self.uid = urlsafe_base64_encode(force_bytes(self.user.pk))
        self.token = default_token_generator.make_token(self.user)
        self.activation_url = reverse('activate', kwargs={'uidb64': self.uid, 'token': self.token})

    def test_account_activation_success(self):
        """
        Should activate user with valid token and uid.
        """
        response = self.client.get(self.activation_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.user.refresh_from_db()
        self.assertTrue(self.user.is_active)

    def test_activation_with_invalid_token(self):
        """
        Should fail activation with invalid token.
        """
        url = reverse('activate', kwargs={
            'uidb64': self.uid,
            'token': 'invalid-token'
        })
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.user.refresh_from_db()
        self.assertFalse(self.user.is_active)

    def test_activation_with_invalid_uid(self):
        """
        Should fail activation with invalid uid.
        """
        url = reverse('activate', kwargs={
            'uidb64': 'invaliduid',
            'token': self.token
        })
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.user.refresh_from_db()
        self.assertFalse(self.user.is_active)

class ResetPasswordTest(APITestCase):
    """
    Fails when user do noe receive mail with link
    """
    def setUp(self):
        self.user = User.objects.create_user(
            email='inactive@example.com',
            password='Password123',
            is_active=True
        )
        self.password_reset_url = reverse('password-reset')

    def test_password_reset(self):
        """
        should fail if user not in db
        """
        data_items = [
            {"email": 'asddas@example.com'},
            {"email": 'kkfkd@example.com'},
        ]
        data_items.append({"email": str(self.user.email)})

        for data in data_items:
            response_reset = self.client.post(self.password_reset_url, data)
            self.assertEqual(response_reset.status_code, status.HTTP_200_OK)



        

    # check mail with link
    # check if return user - it should not ! 

class ResetPasswordConfirmationTest(APITestCase):
    """
    Fails when user not ale to set new password
    """
    def setUp(self):
        self.user = User.objects.create_user(
            email='inactive@example.com',
            password='Password123',
            is_active=True
        )
        self.uid = urlsafe_base64_encode(force_bytes(self.user.pk))
        self.token = default_token_generator.make_token(self.user)

    def test_activation_with_valid_token(self):
        """
        Should accept new password.
        """
        url = reverse('password-reset-confirm', kwargs={
            'uidb64': self.uid,
            'token': self.token
        })
        data = {
            'password': 'Password1234',
            'password2': 'Password1234',
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def test_activation_with_invalid_token(self):
        """
        Should fail changind password.
        """
        url = reverse('password-reset-confirm', kwargs={
            'uidb64': self.uid,
            'token': 'self.token'
        })
        data = {
            'password': 'Password1234',
            'password2': 'Password1234',
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_activation_with_invalid_password(self):
        """
        Should fail changind password.
        """
        url = reverse('password-reset-confirm', kwargs={
            'uidb64': self.uid,
            'token': self.token
        })
        data = {
            'password': 'Password1234',
            'password2': 'PassworD1234',
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


    # check activation link
    # check new password
    # check token
    #TODO check for user with the same email !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

