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

from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Dropout, BatchNormalization
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from tensorflow.keras import regularizers
from tensorflow.keras.callbacks import EarlyStopping

class AxleEnum(Enum):
    Front = 0
    Rear = 1

@dataclass
class BaseUserParameters:
    mounting_component: int
    axle: str
    min_force: int # N
    max_force: int # N
    inner_diamater: float # mm
    outer_diameter: float # mm
    length: float # mm


@dataclass
class UserParameters:
    mounting_component: int
    axle: str
    min_force: int # N
    max_force: int # N
    inner_diamater: float # mm
    outer_diameter: float # mm
    length: float # mm
    shear_modulus: int # N/m^2

    @property
    def k_0(self):
        """
        clculated quasi static stiffnes from simple function
            k_0 = G*A/h
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
class RegisterParameters:
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

    def predict_stiffness(self, user_parameters: UserParameters) -> tuple:
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
        forces_min = np.rint(np.linspace(user_parameters.min_force, 0, len(predicted_stiffness)//2))
        forces_max = np.rint(np.linspace(0, user_parameters.max_force, len(predicted_stiffness)//2))
        
        return (np.concatenate((forces_min, forces_max)), predicted_stiffness)

    def _create_model(self) -> MultiOutputRegressor:
        """
        Create model base on skikitlear and RandomForest
        """
        x = pd.DataFrame(self.data_service.x, columns=self.data_service.labels)
        y = pd.DataFrame(self.data_service.y, columns=[f'k_{i}' for i in range(len(self.data_service.y[0]))]) 

        # Model ML: RandomForest + MultiOutput
        model = MultiOutputRegressor(RandomForestRegressor(random_state=0))
        model.fit(x, y)

        self.model = model




class DataService():

    def __init__(self):
        
        self.x = []
        self.y = []
        self._force = []
        self.labels = ['mounting_component', 'axle', 'k0', 'min_force', 'max_force']

    def add_force(self):
        _x = []
        
        for i in range(len(self.x)):
            _x.append(np.concatenate((self.x[i], self._force[i])))

        self.x = _x
        self.labels.extend([f'force_{i}' for i in range(len(self.x[0])-5)])

    def get_data(self, mounting_component_id=None) -> None:
        """
        Retrive data from db and prapare it to model
        """
        qs = None
        if mounting_component_id:
            qs = BushingRegister.objects.all().filter(mounting_component__id=mounting_component_id)
        else:
            qs = BushingRegister.objects.all()
            
        for model in qs:
            if len(model.stiffness_x) != len(model.stiffness_y) and len(model.stiffness_x) < 5 and len(model.stiffness_y) < 5:
                continue

            register_params = RegisterParameters(model.mounting_component.id, 
                                                  model.axle,
                                                  model.stiffness_y,
                                                  model.stiffness_x
                                                  )
            
            interpolated = self._interpolate_stiffness(register_params.forces, 
                                                       register_params.stiffness, 
                                                       register_params.min_force,
                                                       register_params.max_force,
                                                       )
            
            self._force.append(np.concatenate((np.linspace(register_params.min_force, 0, 10), np.linspace(0, register_params.max_force, 10))))

            self.x.append([
                register_params.mounting_component, 
                register_params.axle_enum, 
                register_params.k_0, 
                register_params.min_force, 
                register_params.max_force
                      ])

            self.y.append(interpolated)

        

    def _interpolate_stiffness(self, forces, stiffness, min_force, max_force, points=10) -> list:
        """
        Transform data with even sampling frequency
        """
        target_forces_min = np.linspace(min_force, 0, points)
        target_forces_max = np.linspace(0, max_force, points)
        interpolated_stiffness = np.interp(np.concatenate((target_forces_min, target_forces_max)), forces, stiffness)
        return interpolated_stiffness

class NeuralNetwork(MLModelService):

    def __init__(self, data_service: DataService):
        self.model = None
        self.data_service = data_service
        self.data_service.add_force()

        # Standardizing the data
        self.scaler_X = StandardScaler()
        self.scaler_y = StandardScaler()

    def predict_stiffness(self, user_parameters: UserParameters) -> tuple:
        """
        Get learning data and user input to predict stiffness from existing data
        """
        self._create_model()

        forces = np.concatenate((np.linspace(user_parameters.min_force, 0, 10), np.linspace(0, user_parameters.max_force, 10)))
        new_input = pd.DataFrame({
            'mounting_component': [user_parameters.mounting_component],
            'axle': [user_parameters.axle_enum],
            'k0': [user_parameters.k_0],
            'min_force': [user_parameters.min_force],
            'max_force': [user_parameters.max_force],
            **{f'force_{i}': forces[i] for i in range(len(forces))}
        })
        

        predicted_stiffness_scaled = self.model.predict(self.scaler_X.transform(new_input))
        predicted_stiffness_scaled_reshape = predicted_stiffness_scaled.reshape(1, -1)
        predicted_stiffness = np.rint(self.scaler_y.inverse_transform(predicted_stiffness_scaled_reshape))[0]

        forces_min = np.rint(np.linspace(user_parameters.min_force, 0, len(predicted_stiffness)//2))
        forces_max = np.rint(np.linspace(0, user_parameters.max_force, len(predicted_stiffness)//2))

        return (np.concatenate((forces_min, forces_max)), predicted_stiffness)

    def _create_model(self):
        """
        Create a Neural Network model to predict stiffness.
        """
        X_train, X_test, y_train, y_test = self._prepare_training_data()

        # Neural Network architecture
        model = Sequential()
        model.add(Dense(units=128, activation='relu', input_dim=X_train.shape[1], kernel_regularizer=regularizers.l2(0.01)))
        model.add(BatchNormalization())
        model.add(Dropout(0.3))

        model.add(Dense(units=64, activation='relu', kernel_regularizer=regularizers.l2(0.01)))
        model.add(BatchNormalization())
        model.add(Dropout(0.3))

        model.add(Dense(units=32, activation='relu', kernel_regularizer=regularizers.l2(0.01)))
        model.add(Dense(units=y_train.shape[1]))  # Multi-output regression
        
        # Compile the model
        model.compile(optimizer='adam', loss='mean_squared_error', metrics=['mae', 'mse'])


        # Early stopping callback to avoid overfitting
        early_stopping = EarlyStopping(monitor='val_loss', patience=20, restore_best_weights=True)

        # Train the model
        model.fit(X_train, y_train, epochs=200, batch_size=32, validation_data=(X_test, y_test), callbacks=[early_stopping], verbose=0)

        self.model = model

    def _prepare_training_data(self):
        """
        Prepare standardize data
        """
        x = pd.DataFrame(self.data_service.x, columns=self.data_service.labels)
        y = pd.DataFrame(self.data_service.y, columns=[f'k_{i}' for i in range(len(self.data_service.y[0]))])

        
        x_scaled = self.scaler_X.fit_transform(x)
        y_scaled = self.scaler_y.fit_transform(y)

        # Train-test split
        X_train, X_test, y_train, y_test = train_test_split(x_scaled, y_scaled, test_size=0.2, random_state=42)

        return X_train, X_test, y_train, y_test


class StiffnessPredictor:

    def __init__(self, strategy: MLModelService):
        self.strategy = strategy
    

    def predict(self, user_params : UserParameters):

        data = DataService()
        data.get_data()
        model = self.strategy(data)
        return model.predict_stiffness(user_params)
    

class StrategyFactory:

    def __init__(self): 
        self._registry = {
            'nonlinear regression': RandomForest,
            'neural network': NeuralNetwork,
        }
        self._cache = []

    def get(self, name) -> MLModelService: 
        # here to add caching model._create_model to reduce model creation time
        # to add async training on db event (INSERT/DELET/UPDATE) ? Redis ?
        # have to move _create_model to MLModelService as abstract

        if name not in self._registry:
            raise KeyError(f"Unknown strategy: {name}")
        
        return self._registry[name]