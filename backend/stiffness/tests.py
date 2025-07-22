from django.test import TestCase
from register.models import BushingRegister, MountingComponentModel, ClientModel, ProjectModel
from rest_framework.test import APITestCase
from django.contrib.auth import get_user_model

User = get_user_model()

class BaseRegisterTestSetup(TestCase):
    @classmethod
    def setUpTestData(cls):
        cls.user = User.objects.create_user(email='reg@bob.com', password='HardCorePass1')
        component = MountingComponentModel.objects.create(name='wishbone')
        client = ClientModel.objects.create(name='bmw')
        cls.project = ProjectModel.objects.create(name='g2x', client=client)
        stiffness_y = [[700, 600, 500, 400, 250, 400, 500, 600, 700, 750], [700, 600, 500, 400, 250, 400, 500, 600, 700, 750], [700, 600, 500, 400, 250, 400, 500, 600, 700, 750]]
        cls.stiffness_x = [[-4000, -3000, -2000, -1000, 0, 1000, 2000, 3000, 4000, 4500], [-4000, -3000, -2000, -1000, 0, 1000, 2000, 3000, 4000, 4500], [-4000, -3000, -2000, -1000, 0, 1000, 2000, 3000, 4000, 4500]]

        cls.register = []
        for index, (stiff_x, stiff_y) in enumerate(zip(cls.stiffness_x, stiffness_y)):
            cls.register.append(BushingRegister.objects.create(
                project=cls.project, 
                custom_pn=f"asdasd_{index}", 
                client_pn=f'adsadw_{index}', 
                storage_locker='L4', 
                stiffness_x=stiff_x,
                stiffness_y=stiff_y,
                mounting_component=component,
                created_by=cls.user
                ))
        

class DataServiceTest(BaseRegisterTestSetup):

    def test_register_create(self):
        """
        Should success if register created correctly
        """
        print(self.register[0].__dict__)
        self.assertEqual(self.register[0].project, self.project)
        self.assertEqual(self.register[0].stiffness_x, self.stiffness_x[0])
    
    def test_data_service(self):
        """
        Shuold success if data retrived
        """
        pass

    def test_data_service_interpolation(self):
        """
        Should return equal len of lists
        """
        pass
class RandomForestTest(BaseRegisterTestSetup):
    def test_create_ml_model(self):
        """
        Should create model
        """
        pass

    def test_create_stiffness_foce_lists(self):
        """
        should create force/stiffness lists
        """
        pass

class PredictStiffnessTest(APITestCase):


    def test_post_predict_stiffness(self):
        """
        Should return stiff/force lists with status code 200
        """
        pass

    def test_post_bad_input_predict_stiffness(self):
        """
        Should  fail with status code 400
        """
        pass

    def test_post_predict_with_proper_characteristics(self):
        """
        Should return expected characteristics
        """
        pass