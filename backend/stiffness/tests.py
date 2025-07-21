from django.test import TestCase
from register.models import BushingRegister, MountingComponentModel, ClientModel, ProjectModel
from rest_framework.test import APITestCase

# Create your tests here.

class DataServiceTest(APITestCase):
    def setUp(self):
        self.component = MountingComponentModel.objects.create(name='wishbone')
        self.client = ClientModel.objects.create(name='bmw')
        self.project = ProjectModel.objects.create(name='g2x', client=self.client)
        stiffness_y = [[700, 600, 500, 400, 250, 400, 500, 600, 700, 750], [700, 600, 500, 400, 250, 400, 500, 600, 700, 750], [700, 600, 500, 400, 250, 400, 500, 600, 700, 750]]
        stiffness_x = [[-4000, -3000, -2000, -1000, 0, 1000, 2000, 3000, 4000, 4500], [-4000, -3000, -2000, -1000, 0, 1000, 2000, 3000, 4000, 4500], [-4000, -3000, -2000, -1000, 0, 1000, 2000, 3000, 4000, 4500]]

        for index, (stiff_x, stiff_y) in enumerate(zip(stiffness_x, stiffness_y)):
            self.register = BushingRegister.objects.create(project=self.project, custom_pn=f"asdasd{index}", client_pn=f'adsadw{index}', storage_locker='L4', mounting_component=self.component)

class RandomForestTest(TestCase):
    pass