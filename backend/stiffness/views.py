from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import CalculateStiffnessSerializer
from stiffness.ml_model import stiffness_prediction, DataService, RandomForest, user_parameters

class CalculateQuasiStaticStiffness(APIView):
    """
    Handles request to calculate quasi-static stiffness
    User enters inner and outer diameter, height and material's Kirchoffs factor
    """
    pass

class EstimateKirchoffsFactor(APIView):
    """
    Base on mounting element and axle estimate factor
    """
    pass


class CalculateStiffnessMapView(APIView):
    """
    Handles request to calculate stiffness map
    """
    def post(self, request):
        serializer = CalculateStiffnessSerializer(data=request.data)
        
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        user_params = user_parameters(serializer.validated_data['mounting_component'], 
                                      serializer.validated_data['axle'], 
                                      serializer.validated_data['min_force'], 
                                      serializer.validated_data['max_force'],
                                      serializer.validated_data['inner_diameter'],
                                      serializer.validated_data['outer_diameter'],
                                      serializer.validated_data['length'],
                                      serializer.validated_data['shear_modulus'])
        data = DataService()
        data.get_data(user_params.mounting_component)
        model = RandomForest(data)
        (force, stiffness) = model.predict_stiffness(user_params)

        return Response({'data': {'stiffness': stiffness, 'forces': force}}, status=status.HTTP_200_OK)
