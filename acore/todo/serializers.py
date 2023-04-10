from rest_framework import serializers
from .models import todoModel

class ToDoSerializer(serializers.ModelSerializer):
    
    def create(self, validated_data):
        return super().create(validated_data)
    
    def update(self,instance, validated_data):
        instance = super().update(instance, validated_data)
        return instance


    class Meta:
        model = todoModel
        fields = '__all__'
    

