#!/usr/bin/python
# -*- coding: utf-8 -*-

from django.db import models
from django.contrib.auth.models import (
    BaseUserManager, AbstractBaseUser
)

# 

'''
user = User.object.create({'login': 'nrjshka@gmail.com', 'password': 'password', 'name': 'Maxim', 'surname': 'Korolev', 'hometown': 'Rybinsk', 'birthDate': datetime.now()})
s = User.objects.create('nrjshka@gmail.com', '231fdgh623','Maxim', 'Korolev', datetime.now(), 'Rybinsk')
'''

class UserManager(BaseUserManager):

	def create_user(self, username , password = None, name = None, surname = None, birthDate = None, hometown = None, user_img = None):

		user = self.model(
			username = username,
			name = name,
			surname = surname,
			birthDate = birthDate,
			hometown = hometown,
			user_img = user_img,
		)

		user.set_password(password)

		user.save(using=self._db)
        
		return user

	def create_superuser(self, username , password , name, surname, birthDate, hometown, user_img):

		user = self.model(
			username = username,
			name = name,
			surname = surname,
			birthDate = birthDate,
			hometown = hometown,
			user_img = user_img,
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
	#дата рождения
	birthDate = models.DateField(auto_now = True)
	#город юзера
	hometown = models.CharField(max_length = 100)
	#аватар пользователя 
	user_img = models.CharField(max_length = 100)
	#активироване ли акаунт(в будущем сделать с подтверждением на почту)
	is_active = models.BooleanField(default=True)
	#это админ?
	is_admin = models.BooleanField(default=False)
	
	objects = UserManager()

	USERNAME_FIELD = 'username'
	REQUIRED_FIELDS = ['name', 'surname', 'hometown', 'birthDate', 'is_admin', 'is_active']

	def get_full_name(self):
		return '{} {}'.format(self.name, self.surname)

	def get_short_name(self):
		return '{} {}'.format(self.name, self.surname)

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
		return '{} {}'.format(self.name, self.surname)

