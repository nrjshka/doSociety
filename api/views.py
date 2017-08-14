from rest_framework import viewsets
from rest_framework.parsers import JSONParser
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

	permission_classes = (IsAuthenticated,)

	''' отправляет id пользователя по логину '''
	def get(self, request, format=None):
		if User.objects.get(username = request.user.username):
			#отправляем id пользователя
			id = str(User.objects.get(username = request.user.username).id)
			return Response({'id': id})
		#если "плохой" запрос, то отправляем ошибку
		return HttpResponseBadRequest()
