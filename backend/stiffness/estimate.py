
from abc import ABC
import google.generativeai as genai
from django.conf import settings

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

    def gemini_estimate(self, user_params):
            genai.configure(api_key=settings.GEMINI_API_KEY)

            system_msg = "You are a the profesional scientist. "
            user_msg = f': {user_params}'

            model = genai.GenerativeModel("gemini-2.5-flash-lite-preview-06-17")

            response = model.generate_content(f'{system_msg}\n\n{user_msg}')

            return response.text

    def shear_modulus(self, user_params):
        return self.gemini_estimate(user_params)



