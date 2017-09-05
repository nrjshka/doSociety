#!/usr/bin/python
# -*- coding: utf-8 -*-
from rest_framework import serializers
from society.models import User

class UserSerializer(serializers.ModelSerializer):
	''' сериализует данные о пользователе '''
	class Meta:
		model = User
		fields = [
			'username',
			'password',
		]

class UserInfoSerializer(serializers.ModelSerializer):
	''' сериализует данные для отображения личной страницы '''
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

class UserSettingsSerializer(serializers.ModelSerializer):
	''' сериализует данные для настроек '''
	class Meta:
		model = User
		fields = [
			'timeSetPassword',
			'username',
		]
