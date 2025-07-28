from rest_framework import serializers
from register.models import BushingRegister


class CalculateStiffnessSerializer(serializers.Serializer):
    mounting_component = serializers.IntegerField() # choices to retrive from db ?
    axle = serializers.CharField() # zweryfikowac czy to bedzie ok
    min_force = serializers.IntegerField()
    max_force = serializers.IntegerField()
    inner_diameter = serializers.FloatField()
    outer_diameter = serializers.FloatField()
    length = serializers.FloatField()
    shear_modulus = serializers.IntegerField()
