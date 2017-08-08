from django.db import models

# Create your models here.

class User(models.Model):
	login = models.CharField(max_length = 100)
	password = models.CharField(max_length = 100)
	name = models.CharField(max_length = 100)
	surname = models.CharField(max_length = 100)
	birthDate = models.DateTimeField()
	hometown = models.CharField(max_length = 100)

	def __str__(self):
		return '{} {}'.format(self.name, self.surname);

	''' Проверка на авторизацию '''
	def auth(self, login, password):
		if login == self.login and password == self.password:
			return True
		return False