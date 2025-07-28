from __future__ import annotations
from dataclasses import dataclass
from register.models import BushingRegister
from abc import ABC, abstractmethod
from sklearn.ensemble import RandomForestRegressor
from sklearn.multioutput import MultiOutputRegressor
import numpy as np
import pandas as pd
from enum import Enum
import math

class AxleEnum(Enum):
    Front = 0
    Rear = 1

@dataclass
class user_parameters:
    mounting_component: int
    axle: str
    # k_0: int
    min_force: int
    max_force: int
    inner_diamater: float
    outer_diameter: float
    length: float
    shear_modulus: int

    @property
    def k_0(self):
        """
        clculated quasi static stiffnes from simple function
        """
        A = math.pi*((self.outer_diameter/2)**2 - (self.inner_diamater/2)**2)
        return int((self.shear_modulus/10e6)*A/self.length)

    @property
    def axle_enum(self):
        """
        axle string to num
        """
        return AxleEnum[self.axle].value

@dataclass
class register_parameters:
    mounting_component: int
    axle: str
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
    
    @property
    def axle_enum(self):
        """
        axle string to num
        """
        return AxleEnum[self.axle].value

    

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

    def __init__(self, data_service: DataService):
        self.model = None
        self.data_service = data_service

    def predict_stiffness(self, user_parameters: user_parameters) -> tuple:
        """
        Get learing data and user input to predict stiffness from existing data
        """
        self._create_model()
        
        new_input = pd.DataFrame({
            'mounting_component': [user_parameters.mounting_component],
            'axle': [user_parameters.axle_enum],
            'k0': [user_parameters.k_0],
            'min_force': [user_parameters.min_force],
            'max_force': [user_parameters.max_force]
        })

        predicted_stiffness = np.rint(self.model.predict(new_input)[0])
        forces = np.rint(np.linspace(user_parameters.min_force, user_parameters.max_force, len(predicted_stiffness)))
        
        return (forces, predicted_stiffness)

    def _create_model(self) -> MultiOutputRegressor:
        """
        Create model base on skikitlear and RandomForest
        """
        x = pd.DataFrame(self.data_service.x, columns=['mounting_component', 'axle', 'k0', 'min_force', 'max_force'])
        y = pd.DataFrame(self.data_service.y, columns=[f'k_{i}' for i in range(len(self.data_service.y[0]))]) 

        # Model ML: RandomForest + MultiOutput
        model = MultiOutputRegressor(RandomForestRegressor(random_state=0))
        model.fit(x, y)

        self.model = model




class DataService():

    def __init__(self):
        
        self.x = []
        self.y = []

    def get_data(self, mounting_component_id) -> None:
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
                      register_params.axle_enum, 
                      register_params.k_0, 
                      register_params.min_force, 
                      register_params.max_force,
                      ])
            
            self.y.append(interpolated)

        

    def _interpolate_stiffness(self, forces, stiffness, min_force, max_force, points=20) -> list:
        """
        Transform data with even sampling frequency
        """
        target_forces = np.linspace(min_force, max_force, points)
        interpolated_stiffness = np.interp(target_forces, forces, stiffness)
        return interpolated_stiffness
