from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import CalculateStiffnessSerializer
from ml_model import stiffness_prediction, DataService, RandomForest, user_input

class calculateStiffnessView(APIView):
    
    def post(self, request):
        serializer = CalculateStiffnessSerializer(data=request.data)

        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        predicted_forces = stiffness_prediction()
        data = DataService()
        data.get_data(serializer.mounting_component)
        model = RandomForest()
        stiffness = model.predict_stiffness(data, user_input(serializer.mounting_component, serializer.axle, serializer.k0, serializer.min_force, serializer.max_force))

        return Response()
