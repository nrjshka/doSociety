#!/usr/bin/python
# -*- coding: utf-8 -*-
from rest_framework.routers import DefaultRouter
from django.conf.urls import url, include
from rest_framework_jwt.views import obtain_jwt_token, verify_jwt_token, refresh_jwt_token
from django.contrib import admin
from .views import *

#отображение всех пользователей
router = DefaultRouter()
router.register(r'getusers', UserViewSet)

urlpatterns = router.urls


urlpatterns += [
	url(r'^token-auth', obtain_jwt_token),
	url(r'^token-refresh', refresh_jwt_token),
	url(r'^token-verify', verify_jwt_token),
	url(r'^getid', GetId.as_view()),
	url(r'^getuserinfo', GetUserInfo.as_view()),
	url(r'^getsettingsinfo', GetUserSettings.as_view()),
	url(r'^checkuserpassword', CheckUserPassword.as_view()),
	url(r'^changeuserpassword', ChangeUserPassword.as_view()),
	url(r'^changeuserurl', ChangeUserUrl.as_view()),
	url(r'^changeuserlogin', ChangeUserLogin.as_view()),
	url(r'^getmessagedata', GetMessageData.as_view()),
	url(r'^requesttofriend', RequestToFriend.as_view()),
	url(r'^addfriend', AddFriend.as_view()),
	url(r'^savebiography', SaveBiography.as_view()),
	url(r'^saveideology', SaveIdeology.as_view()),
	url(r'^deletefriend', DeleteFriend.as_view()),
	url(r'^checkfriends', CheckFriends.as_view()),
	url(r'^cancellationofrequest', CancellationOfRequest.as_view()),
	url(r'^cancellationofadding', CancellationOfAdding.as_view()),
	url(r'^addmessage', AddMessage.as_view()),
	url(r'^register', Register.as_view()),
	url(r'^check-register', CheckRegistered.as_view()),
]
