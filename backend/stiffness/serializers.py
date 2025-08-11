from rest_framework import serializers
from register.models import BushingRegister


class BaseCalculateStiffnessSerializer(serializers.Serializer):
    mounting_component = serializers.IntegerField()
    axle = serializers.CharField()
    min_force = serializers.IntegerField()
    max_force = serializers.IntegerField()
    inner_diameter = serializers.FloatField()
    outer_diameter = serializers.FloatField()
    length = serializers.FloatField()

class CalculateStiffnessSerializer(serializers.Serializer):
    ESTIMATION_MODEL_TYPE = [
        ('nonlinear regression', 'nonlinear_regression'),
        ('neural network', 'neural_network')
    ]

    mounting_component = serializers.IntegerField() 
    axle = serializers.CharField() 
    min_force = serializers.IntegerField()
    max_force = serializers.IntegerField()
    inner_diameter = serializers.FloatField()
    outer_diameter = serializers.FloatField()
    length = serializers.FloatField()
    shear_modulus = serializers.IntegerField()
    estimation_model = serializers.ChoiceField(choices=ESTIMATION_MODEL_TYPE) 