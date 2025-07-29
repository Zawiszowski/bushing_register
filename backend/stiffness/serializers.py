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
    mounting_component = serializers.IntegerField() 
    axle = serializers.CharField() 
    min_force = serializers.IntegerField()
    max_force = serializers.IntegerField()
    inner_diameter = serializers.FloatField()
    outer_diameter = serializers.FloatField()
    length = serializers.FloatField()
    shear_modulus = serializers.IntegerField()