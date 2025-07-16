from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import CalculateStiffnessSerializer
from ml_model import stiffness_prediction

class calculateStiffnessView(APIView):
    
    def post(self, request):
        serializer = CalculateStiffnessSerializer(data=request.data)

        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        predicted_forces = stiffness_prediction()
        return Response()
