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

	def create_user(self, username , password = None, name = None, surname = None, birthDate = None, hometown = None, user_foto = None, workplace = None):

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

	username = models.CharField(max_length = 100, unique=True)
	password = models.CharField(max_length = 100)
	name = models.CharField(max_length = 100)
	surname = models.CharField(max_length = 100)
	birthDate = models.DateField(auto_now = False)
	hometown = models.CharField(max_length = 100)
	workplace = models.CharField(max_length = 100)
	user_foto = models.CharField(max_length = 150)
	is_active = models.BooleanField(default=True)
	is_admin = models.BooleanField(default=False)

	objects = UserManager()

	USERNAME_FIELD = 'username'
	REQUIRED_FIELDS = ['name', 'surname', 'hometown', 'birthDate', 'user_foto', 'workplace']

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

	def auth(self, login, password):
		if login == self.username and password == self.password:
			return True
		return False