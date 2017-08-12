from rest_framework import viewsets
from .serializers import *
from society.models import User

class UserViewSet(viewsets.ModelViewSet):
	queryset = User.objects.all()
	serializer_class = UserSerializer