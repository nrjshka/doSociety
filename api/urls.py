from rest_framework.routers import DefaultRouter
from django.conf.urls import url, include
from rest_framework_jwt.views import obtain_jwt_token, verify_jwt_token, refresh_jwt_token
from django.contrib import admin
from .views import *

router = DefaultRouter()
router.register(r'getusers', UserViewSet)

urlpatterns = router.urls


urlpatterns += [
	url(r'^token-auth/', obtain_jwt_token),
	url(r'^token-refresh/', refresh_jwt_token),
	url(r'^token-verify/', verify_jwt_token),
	url(r'^getid/', GetId.as_view()),
	url(r'^getuserinfo', GetUserInfo.as_view()),
]