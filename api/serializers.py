from rest_framework import serializers
from society.models import User

class UserSerializer(serializers.ModelSerializer):
	class Meta:
		model = User
		fields = [
			'login',
			'password',
		]

