from django.test import TestCase
from register.models import BushingRegister, MountingComponentModel, ClientModel, ProjectModel
from rest_framework.test import APITestCase
from django.contrib.auth import get_user_model
from stiffness.ml_model import DataService, RandomForest, user_parameters
from sklearn.multioutput import MultiOutputRegressor

User = get_user_model()

class BaseRegisterTestSetup(TestCase):
    @classmethod
    def setUpTestData(cls):
        cls.user = User.objects.create_user(email='reg@bob.com', password='HardCorePass1')
        cls.component = MountingComponentModel.objects.create(name='wishbone')
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
                mounting_component=cls.component,
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
    
    def test_data_service_interpolation(self):
        """
        Should return dect of X and Y with equal len
        """
        service = DataService()
        res = service._interpolate([-10, -5, -2, 0, 2, 5, 10], [500, 300, 200, 100, 200, 300, 500])
        self.assertEqual(len(res['X']), 20)
        self.assertEqual(len(res['Y']), 20)

    def test_data_service(self):
        """
        Shuold success if data retrived
        """
        service = DataService()
        res = service.get_data(self.component.id)

        self.assertEqual(len(res['X']), 20)
        self.assertEqual(len(res['Y']), 20)

        self.assertEqual((res['X'][0], res['X'][-1]), (self.register[0].stiffness_x[0], self.register[0].stiffness_x[-1]))
        self.assertEqual((res['Y'][0], res['Y'][-1]), (self.register[0].stiffness_y[0], self.register[0].stiffness_y[-1]))



class RandomForestTest(BaseRegisterTestSetup):

    def setUp(self):
        data = DataService()
        self.data_service = data.get_data(self.component.id)

    def test_create_ml_model(self):
        """
        Should create model
        """

        service = RandomForest()
        model = service._create_model(self.data_service)

        self.assertTrue(model)

    def test_create_stiffness_foce_lists(self):
        """
        should create force/stiffness lists
        """ 
        user_param = user_parameters(1, 1, 100, 200, 300)
        service = RandomForest()
        stiffness = service.predict_stiffness(self.data_service, user_param)
        # TODO think how to verify correctnes of data ? what if user picks data from outside of range ?
        self.assertEqual(len(stiffness['X']), 20)
        self.assertEqual(len(stiffness['Y']), 20)

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