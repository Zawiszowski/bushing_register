from __future__ import annotations
from dataclasses import dataclass
from register.models import BushingRegister
from abc import ABC, abstractmethod
from sklearn.multioutput import MultiOutputRegressor
import numpy as np



@dataclass
class user_parameters:
    mounting_component: int
    axle: int
    k_0: int
    min_force: int
    max_force: int


@dataclass
class register_parameters:
    mounting_component: int
    axle: int
    stiffness: list
    forces: list


    @property
    def k_0(self):
        """
        quasi-static factor, is in the stiffness y, near 0N forces (stiffness_x)
        """
        threshold = 2
        try:
            middle = np.where((np.array(self.forces) < threshold) & (np.array(self.forces) > -threshold))
            return self.stiffness[min(middle[0])]

        except ValueError:
            middle = len(self.forces)//2
            threshold_step = 1
            stiff_near_0 = []
            for swing in range(-threshold_step-1, threshold_step, 1):
                stiff_near_0.append(abs(self.forces[middle + swing]))
            print(stiff_near_0)
            return self.stiffness[self.forces.index(min(stiff_near_0))]
        
    @property
    def min_force(self):
        """
        min from forces list
        """
        return min(self.forces)

    @property
    def max_force(self):
        """
        max from forces list
        """
        return max(self.forces)
    

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

    def predict_stiffness(self, data_service: DataService, user_parameters: user_parameters):
        """
        Get learing data and user input to predict stiffness from existing data
        """
        self._create_model(data_service)
        pass

    def _create_model(self, data_service) -> MultiOutputRegressor:
        """
        Create model base on skikitlear and RandomForest
        """
        pass



class DataService():

    def __init__(self):
        
        self.x = []
        self.y = []

    def get_data(self, mounting_component_id) -> tuple:
        """
        Retrive data from db and prapare it to model
        """
        qs = BushingRegister.objects.all().filter(mounting_component__id=mounting_component_id)
        
        for model in qs:
            if len(model.stiffness_x) != len(model.stiffness_y) and len(model.stiffness_x) < 5 and len(model.stiffness_y) < 5:
                continue
            
            register_params = register_parameters(model.mounting_component.id, 
                                                  model.axle,
                                                  model.stiffness_y,
                                                  model.stiffness_x
                                                  )
            
            interpolated = self._interpolate_stiffness(register_params.forces, 
                                                       register_params.stiffness, 
                                                       register_params.min_force,
                                                       register_params.max_force,
                                                       )
            self.x.append([register_params.mounting_component, 
                      register_params.axle, 
                      register_params.k_0, 
                      register_params.min_force, 
                      register_params.max_force,
                      ])
            
            self.y.append(interpolated)

        

    def _interpolate_stiffness(self, forces, stiffness, min_force, max_force, points=20) -> dict:
        """
        Transform data with even sampling frequency
        """
        target_forces = np.linspace(min_force, max_force, points)
        interpolated_stiffness = np.interp(target_forces, forces, stiffness)
        return interpolated_stiffness
