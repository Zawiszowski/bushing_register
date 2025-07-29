
from abc import ABC
import google.generativeai as genai
from django.conf import settings
from stiffness.ml_model import BaseUserParameters

class EstimateService(ABC):

    def shear_modulus(self, user_params):
        """
        Estimates shear modulus base on userParameters. Should return value in Pa
        """
        pass

class DummyEstimate(EstimateService):

    def shear_modulus(self, user_params):
        pass

class GeminiEstimate(EstimateService):

    def gemini_estimate(self, user_params :BaseUserParameters):
            genai.configure(api_key=settings.GEMINI_API_KEY)

            system_msg = "You are the profesional scientist in automotive industry. Take the role as engineer where responsible for developing suspension elements, mainy in elastomer bushing sleeves  "
            user_msg = f'Estimate shear modulus for suspension components. Your answear should only represent integer value and it represented in Pascals'
            user_params_msg = f'Base on following paremeters estimate shear modulus:' \
                            f'Component in which bushing will be mounted: {user_params.mounting_component}'\
                            f'Bushing will operate on {user_params.axle} axle' \
                            f'Bushing will operate in dynamic enviroment with forces between {user_params.min_force} and {user_params.max_force} for velocity around 0.5 m/s' \
                            f'Bushing dimesions are: inner diameter - {user_params.inner_diamater}, outer diameter - {user_params.outer_diameter}, length/height - {user_params.length}' \
                            f'Assume that we are looking for quasi-static stiffnes and bushing accounts only on radial/perpendicular forces '
                

            model = genai.GenerativeModel("gemini-2.5-flash-lite-preview-06-17")

            response = model.generate_content(f'{system_msg}\n\n{user_msg}\n\n{user_params_msg}')

            return response.text

    def shear_modulus(self, user_params):
        return self.gemini_estimate(user_params)



