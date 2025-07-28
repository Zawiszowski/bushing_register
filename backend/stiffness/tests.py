from django.test import TestCase
from register.models import BushingRegister, MountingComponentModel, ClientModel, ProjectModel
from rest_framework.test import APITestCase
from django.contrib.auth import get_user_model
from stiffness.ml_model import DataService, RandomForest, user_parameters, register_parameters
from sklearn.multioutput import MultiOutputRegressor
from django.urls import reverse

User = get_user_model()

class BaseRegisterTestSetup(APITestCase):
    @classmethod
    def setUpTestData(cls):
        cls.user = User.objects.create_user(email='reg@bob.com', password='HardCorePass1')
        cls.component = MountingComponentModel.objects.create(name='wishbone')
        client = ClientModel.objects.create(name='bmw')
        cls.project = ProjectModel.objects.create(name='g2x', client=client)
        stiffness_y = [[700, 600, 500, 400, 250, 400, 500, 600, 700, 750], [700, 600, 500, 400, 250, 400, 500, 600, 700, 750], [700, 600, 500, 400, 250, 400, 500, 600, 700, 750]]
        cls.stiffness_x = [[-4000, -3000, -2000, -1000, 6, 1000, 2000, 3000, 4000, 4500], [-4000, -3000, -2000, -1000, 0, 1000, 2000, 3000, 4000, 4500], [-4000, -3000, -2000, -1000, 0, 1000, 2000, 3000, 4000, 4500]]

        cls.registers = []
        for index, (stiff_x, stiff_y) in enumerate(zip(cls.stiffness_x, stiffness_y)):
            cls.registers.append(BushingRegister.objects.create(
                project=cls.project, 
                custom_pn=f"asdasd_{index}", 
                client_pn=f'adsadw_{index}', 
                storage_locker='L4', 
                stiffness_x=stiff_x,
                stiffness_y=stiff_y,
                mounting_component=cls.component,
                created_by=cls.user
                ))
        

class DataServiceTest(BaseRegisterTestSetup):

    def test_register_create(self):
        """
        Should success if register created correctly
        """
        
        self.assertEqual(self.registers[0].project, self.project)
        self.assertEqual(self.registers[0].stiffness_x, self.stiffness_x[0])
    
    def test_data_service_interpolation(self):
        """
        Should return dect of X and Y with equal len
        """
        service = DataService()
        res = service._interpolate_stiffness([-10, -5, -2, 0, 2, 5, 10], [500, 300, 200, 100, 200, 300, 500], -10, 10, 20)
 
        self.assertEqual(len(res), 20)


    def test_data_service(self):
        """
        Shuold success if data retrived
        """
        register_params = register_parameters(self.registers[0].mounting_component,
                                              self.registers[0].axle,
                                              self.registers[0].stiffness_y,
                                              self.registers[0].stiffness_y)
        service = DataService()
        service.get_data(self.component.id)

        self.assertEqual(service.x[0], [self.component.id, 0, 250, -4000, 4500])
        self.assertEqual(len(service.y[0]), 20)



class RandomForestTest(BaseRegisterTestSetup):

    def setUp(self):
        self.data_service = DataService()
        self.user_param = user_parameters(self.component.id, 'Front', 3000, 3500, 25, 70, 80, 5*10e6)
        self.data_service.get_data(self.user_param.mounting_component)

    def test_create_ml_model(self):
        """
        Should create model
        """

        service = RandomForest(self.data_service)
        service._create_model()

        self.assertTrue(service.model)

    def test_create_stiffness_foce_lists(self):
        """
        should create force/stiffness lists
        """ 
        
        ml_service = RandomForest(self.data_service)
        (force, stiffness) = ml_service.predict_stiffness(self.user_param)
        # TODO think how to verify correctnes of data ? what if user picks data from outside of range ?

        self.assertEqual(len(stiffness), 20)
        self.assertEqual(len(force), 20)
    
    def test_k0_calculation(self):
        """
        should success if values are the same
        """
        self.assertAlmostEqual(209, self.user_param.k_0)

class PredictStiffnessTest(BaseRegisterTestSetup):

    def test_post_predict_stiffness(self):
        """
        Should return stiff/force lists with status code 200
        """
        data = {
            'mounting_component': self.component.id,
            'axle': 'Front',
            'min_force': 3000,
            'max_force': 3500,
            'inner_diameter': 25,
            'outer_diameter': 70,
            'length': 80,
            'shear_modulus': 5*10e6
        }

        url = reverse('calculate_stiffness')
        res = self.client.post(url, data, format='json')

        self.assertEqual(res.status_code, 200)
        self.assertTrue(len(res.data['data']['stiffness']) > 0)
        

    def test_post_bad_input_predict_stiffness(self):
        """
        Should  fail with status code 400
        """
        data = {
            'axle': 'Rear',
            'k0': 260,
            'min_force': 3000,
            'max_force': 3500,
        }

        url = reverse('calculate_stiffness')
        res = self.client.post(url, data, format='json')

        self.assertEqual(res.status_code, 400)

    def test_post_predict_with_proper_characteristics(self):
        """
        Should return expected characteristics
        """
        pass