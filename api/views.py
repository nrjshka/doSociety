from rest_framework import viewsets
from rest_framework.renderers import JSONRenderer
from django.http import HttpResponseBadRequest
from rest_framework.views import APIView
from .serializers import *
from society.models import User
from rest_framework.response import Response
from rest_framework import authentication, permissions
from rest_framework.permissions import IsAuthenticated

class UserViewSet(viewsets.ModelViewSet):
	queryset = User.objects.all()
	serializer_class = UserSerializer

	permission_classes = ()

class GetId(APIView):
	#класс доступа - Токен JWT
	permission_classes = (IsAuthenticated,)

	''' отправляет id пользователя по логину '''
	def get(self, request, format = None):
		if User.objects.get(username = request.user.username):
			#отправляем id пользователя
			id = str(User.objects.get(username = request.user.username).id)
			return Response({'id': id})
		#если "плохой" запрос, то отправляем ошибку
		return HttpResponseBadRequest()

class GetUserInfo(APIView):

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
