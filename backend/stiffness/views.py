from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import CalculateStiffnessSerializer, BaseCalculateStiffnessSerializer
from stiffness.estimate import GeminiEstimate
from stiffness.ml_model import DataService, RandomForest, UserParameters, BaseUserParameters, NeuralNetwork, StiffnessPredictor, StrategyFactory

class CalculateQuasiStaticStiffness(APIView):
    """
    Handles request to calculate quasi-static stiffness
    User enters inner and outer diameter, height and material's Kirchoffs factor
    """
    pass

class EstimateShearModulus(APIView):
    """
    Base on mounting element, axle, d, D, L estimate shear modulus
    """
    def post(self, request):
        serializer = BaseCalculateStiffnessSerializer(data=request.data)
        
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        user_params = BaseUserParameters(
            serializer.validated_data['mounting_component'], 
            serializer.validated_data['axle'], 
            serializer.validated_data['min_force'], 
            serializer.validated_data['max_force'],
            serializer.validated_data['inner_diameter'],
            serializer.validated_data['outer_diameter'],
            serializer.validated_data['length'],
            )

        estimate = GeminiEstimate()
        suggestion = estimate.shear_modulus(user_params)

        return Response({'data': suggestion}, status=status.HTTP_200_OK)
    
class CalculateStiffnessMapView(APIView):
    """
    Handles request to calculate stiffness map
    """
    def post(self, request):
        serializer = CalculateStiffnessSerializer(data=request.data)
        
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        user_params = UserParameters(
            serializer.validated_data['mounting_component'], 
            serializer.validated_data['axle'], 
            serializer.validated_data['min_force'], 
            serializer.validated_data['max_force'],
            serializer.validated_data['inner_diameter'],
            serializer.validated_data['outer_diameter'],
            serializer.validated_data['length'],
            serializer.validated_data['shear_modulus'],
            )
        
        strategy = StrategyFactory().get(serializer.validated_data['estimation_model'])
        predictor = StiffnessPredictor(strategy)
        (force, stiffness) = predictor.predict(user_params)

        return Response({'data': {'stiffness': stiffness, 'forces': force}}, status=status.HTTP_200_OK)
