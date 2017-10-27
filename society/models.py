#!/usr/bin/python
# -*- coding: utf-8 -*-

from django.db import models 
from django.contrib.auth.models import (
    BaseUserManager, AbstractBaseUser
)

from vkGroups.models import vkGroup

#

class UserManager(BaseUserManager):

	def create_user(self, username , password = None, name = None, surname = None, birthDate = None, hometown = None, user_foto = None, workplace = None):

		user = self.model(
			username = username,
			name = name,
			surname = surname,
			birthDate = birthDate,
			hometown = hometown,
			user_foto = user_foto,
			workplace = workplace,
            urlid = "",
		)

		user.set_password(password)

		user.save(using=self._db)

		return user

	def create_superuser(self, username , password , name, surname, birthDate, hometown, user_foto, workplace):
		user = self.model(
			username = username,
			name = name,
			surname = surname,
			birthDate = birthDate,
			hometown = hometown,
			user_foto = user_foto,
			workplace = workplace,
		)

		user.set_password(password)

		user.is_admin = True
		user.save(using=self._db)

		return user


class User(AbstractBaseUser):
	#логин юзера
	username = models.CharField(max_length = 100, unique=True)
	#пароль - наследуется
	#имя пользователя
	name = models.CharField(max_length = 100)
	#фамилия
	surname = models.CharField(max_length = 100)
    #место работы
	workplace = models.CharField(max_length = 100)
	#аватар пользователя
	user_foto = models.CharField(max_length = 150)
	#дата рождения
	birthDate = models.DateField(auto_now = False)
	#город юзера
	hometown = models.CharField(max_length = 100)
    #поля использующееся заместо id, если = "" - то используется id[номер]
	urlid = models.CharField(max_length = 100, default = "")
	#время последнего изменения
	timeSetPassword = models.DateField(auto_now = True)
	#активироване ли акаунт(в будущем сделать с подтверждением на почту)
	is_active = models.BooleanField(default=True)
	#это админ?
	is_admin = models.BooleanField(default=False)
	#список исходящих заявок в друзья
	listOfIncoming = models.ManyToManyField("self", related_name = "listOfIncoming")
	#список входящих заявок в друзья
	listOfOutcoming = models.ManyToManyField("self" , related_name = "listOfOutcoming")
	#список друзей
	listOfFriends = models.ManyToManyField("self" , related_name = "listOfFriends")
	#vk id
	vk_id = models.CharField(max_length = 100)
	#Список групп вк
	vk_groups = models.ManyToManyField(vkGroup, related_name = "vk_groups")

	objects = UserManager()

	USERNAME_FIELD = 'username'

	REQUIRED_FIELDS = ['name', 'surname', 'hometown', 'birthDate', 'user_foto', 'workplace',]

	def get_full_name(self):
		return '{} {}'.format(self.name, self.surname)

	def get_short_name(self):
		return '{} {}'.format(self.name, self.surname)

	def setHometown(self, hometown):
		if hometown == 0:
			self.hometown = 'Moscow'
		else:
			self.hometown = 'Rybinsk'


	def has_perm(self, perm, obj=None):
		return True

	def has_module_perms(self, app_label):
		return True

	def set_admin(self):
		self.is_admin = True

	@property
	def is_staff(self):
		return self.is_admin

	def __str__(self):
		return '{}'.format(self.username)
