#!/usr/bin/python
# -*- coding: utf-8 -*-
from rest_framework import viewsets
from rest_framework.renderers import JSONRenderer
from django.http import HttpResponseBadRequest
from rest_framework.views import APIView
from .serializers import *
from society.models import User
from rest_framework.response import Response
from rest_framework import authentication, permissions
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.hashers import check_password

class UserViewSet(viewsets.ModelViewSet):
	queryset = User.objects.all()
	serializer_class = UserSerializer

	permission_classes = ()

class GetId(APIView):
	''' отправляет id пользователю в ответ на его токен в хедере и логин(переделать) '''
	#класс доступа - Токен JWT
	permission_classes = (IsAuthenticated,)

	''' отправляет id пользователя по логину '''
	def get(self, request, format = None):
		#определяем пользователя
		userName = request.user.username
		if User.objects.get(username = userName):
			#отправляем id пользователя
			id = str(User.objects.get(username = userName).id)
			urlid = str(User.objects.get(username = userName).urlid)
			return Response({'id': id, 'urlid': urlid})
		#если "плохой" запрос, то отправляем ошибку
		return HttpResponseBadRequest()

class GetUserInfo(APIView):
	''' отправляет личную информацию о пользователе в ответ на его id '''
	permission_classes = ()
	renderer_classes = {JSONRenderer, }

	def post(self, request, formant = None):
		#определяем есть ли такой человек, если нет, то выдаем ошибку
		try:
			user = User.objects.get(id = request.data['id'])
			#возвращаем сериализованные данные
			return Response(UserInfoSerializer(user).data)
		except User.DoesNotExist:
			#если не нашли человека, то отправляем ошибку
			return HttpResponseBadRequest()

class GetUserSettings(APIView):
	''' отправляет настройки пользователю в ответ на его токен '''

	permission_classes = (IsAuthenticated,)

	def get(self, request, format = None):
		#мы должны отправить ему список настроек
		return Response(UserSettingsSerializer(User.objects.get(username = request.user.username)).data)

class CheckUserPassword(APIView):
	''' проверяет текущий и действующий пароль, требует токена '''

	permission_classes = (IsAuthenticated, )
	renderer_classes = {JSONRenderer, }

	def post(self, request, format = None):
		#должны проверить пароль и прислать ответ
		if request.data['password']:
			#если нам передали пароль
			#получаем пользователя
			user = User.objects.get(username = request.user.username)
			#проверяем присланный пароль и действующий
			if check_password(request.data['password'], user.password):
				#пароли совпадают
				return Response({'status': True})
			else:
				#пароли не совпали
				return Response({'status': False})
		else:
			#если нам не прислали старый пароль
			return HttpResponseBadRequest()

class ChangeUserPassword(APIView):
	''' меняет пароль пользователя на полученный, требует токена пользователя '''

	permission_classes = (IsAuthenticated, )
	renderer_classes = {JSONRenderer, }

	def post(self, request, format = None):
		if request.data['password']:
			#получаем пользователя
			user = User.objects.get(username = request.user.username)
			#меняем ему пароль
			user.set_password(request.data['password'])
			#сохраняем изменения
			user.save()
			user.timeSetPassword = date.today()
			#нужно еще поменять дату последнего изменения пароля
			#отправляем "удачный ответ"
			return Response({'status': True})
		else:
			#если не было получено пароля
			return HttpResponseBadRequest()

class ChangeUserUrl(APIView):
	''' меняет url или говорит, что url занят'''

	permission_classes = (IsAuthenticated, )
	renderer_classes = {JSONRenderer, }

	def post(self, request, format = None):
		if request.data['newUrl']:
			#получаем данные из newUrl и ищем занят ли url или нет
			try:
				user = User.objects.get(urlid = request.data['newUrl'])
			except User.DoesNotExist:
				user = None
			#если не нашли никого с желаемым url или это наш старый адрес
			if not(user) or User.objects.get(username = request.user.username).urlid == request.data['newUrl']:
				#получаем нашего пользователя
				user = User.objects.get(username = request.user.username)
				user.urlid = request.data['newUrl']
				user.save()
				return Response({'status': True})
			return Response({'status': False})
		else:
			#пробрасываем ошибку в обратном случае
			return HttpResponseBadRequest()

class ChangeUserLogin(APIView):
	''' меняет login на присланный '''

	permission_classes = (IsAuthenticated, )
	renderer_classes = {JSONRenderer, }

	def post(self, request, format = None):
		if request.data['newLogin']:
			#получаем пользователя
			user = User.objects.get(username = request.user.username)
			user.username = request.data['newLogin']
			user.save()
			return Response({'status': True})
		else:
			#пробрасываем ошибку в обратном случае
			return HttpResponseBadRequest()

class GetMessageData(APIView):
	''' получает стартовые данные сообщения в формате json для общения'''
	
	permission_classes = (IsAuthenticated, )
	renderer_classes = {JSONRenderer, }
	
	def post(self, request, format = None):
		if request.data['receiver_id']:
			''' если все "ок", то мы должны
				написать свой сериалайзер, 
				который будет удобен для представления '''
			output = []

			
			return Response({ 'msg_data': output })
		else:
			#пробрасываем ошибку в обратном случае
			return HttpResponseBadRequest()






