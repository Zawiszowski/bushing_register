from dataclasses import dataclass
from register.models import BushingRegister
from abc import ABC, abstractmethod
from __future__ import annotations



@dataclass
class user_input:
    mounting_component: int
    axle: int
    k_0: int
    min_force: int
    max_force: int


@dataclass
class register:
    mounting_component: int
    axle: int
    stiffness: list
    forces: list


    @property
    def k_0(self):
        """
        quasi-static factor, is in the stiffness y, near 0N forces (stiffness_x)
        """
        pass

    @property
    def min_force(self):
        """
        min from forces list
        """
        pass

    @property
    def max_force(self):
        """
        max from forces list
        """
        pass
    

def stiffness_prediction() -> list:
    pass

class MLModelService(ABC):

    @abstractmethod
    def predict_stiffness():
        """
        Universal method to generate stiffness and force lists
        """
        pass

class RandomForest(MLModelService):

    def predict_stiffness(self, learing_data: DataService, user_input: user_input):
        """
        Get learing data and user input to predict stiffness from existing data
        """
        self._create_model()
        pass

    def _create_model(self):
        """
        Create model base on skikitlear and RandomForest
        """
        pass



class DataService():

    def get_data(self, counting_compoenent_id) -> dict:
        """
        Retrive data from db
        """
        qs = BushingRegister.objects.all().filter(mounting_component__id=counting_compoenent_id)
        self._interpolate()
        return {'X': {}, 'Y': {}}

    def _interpolate(self, X, Y) -> dict:
        """
        Transform data with even sampling frequency
        """
        pass
