from rest_framework import viewsets
from .serializers import *
from society.models import User
from rest_framework.response import Response
from rest_framework.authtoken.views import ObtainAuthToken

class UserViewSet(viewsets.ModelViewSet):
	queryset = User.objects.all()
	serializer_class = UserSerializer
