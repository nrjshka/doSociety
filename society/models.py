from django.db import models
from django.contrib.auth.models import (
    BaseUserManager, AbstractBaseUser
)

# 

class UserManager(BaseUserManager):

	def create_user(self, login, password, name, surname, birthDate, hometown):

		user = self.model(
			login = login,
			surname = surname,
			birthDate = birthDate,
			hometown = hometown,
		)

		user.set_password(password)
		user.set_login(login)
		user.set_name(name)

		user.save(using=self._db)
        
		return user

	def create_superuser(self, login, password, name, surname, birthDate, hometown):

		user = self.model(
			login = login,
			surname = surname,
			birthDate = birthDate,
			hometown = hometown,
		)

		user.set_password(password)
		user.set_name(name)

		user.is_admin = True
		user.save(using=self._db)

		return user


class User(AbstractBaseUser):

	login = models.CharField(max_length = 100, unique=True)
	password = models.CharField(max_length = 100)
	name = models.CharField(max_length = 100)
	surname = models.CharField(max_length = 100)
	birthDate = models.DateTimeField()
	hometown = models.CharField(max_length = 100)
	is_active = models.BooleanField(default=True)
	is_admin = models.BooleanField(default=False)

	objects = UserManager()

	USERNAME_FIELD = 'login'
	REQUIRED_FIELDS = ['']

	def get_full_name(self):
		return '{} {}'.format(self.name, self.surname)

	def get_short_name(self):
		return '{} {}'.format(self.name, self.surname)

	def has_perm(self, perm, obj=None):
		return True

	def has_module_perms(self, app_label):
		return True

	@property
	def is_staff(self):
		return self.is_admin

	def __str__(self):
		return '{} {}'.format(self.name, self.surname)

	def auth(self, login, password):
		if login == self.login and password == self.password:
			return True
		return False