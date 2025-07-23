from rest_framework import serializers
from register.models import BushingRegister


class CalculateStiffnessSerializer(serializers.Serializer):
    mounting_component = serializers.IntegerField() # choices to retrive from db ?
    axle = serializers.CharField() # zweryfikowac czy to bedzie ok
    k0 = serializers.IntegerField() # these field is to find out or user will send d, D, H and G factor
    min_force = serializers.IntegerField()
    max_force = serializers.IntegerField()
