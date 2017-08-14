from rest_framework import serializers
from society.models import User

class UserSerializer(serializers.ModelSerializer):
	class Meta:
		model = User
		fields = [
			'username',
			'password',
		]

class UserInfoSerializer(serializers.ModelSerializer):
	class Meta:
		model = User
		fields = [
			'name',
			'surname',
			'birthDate',
			'hometown',
			'user_foto',
			'workplace',
		]