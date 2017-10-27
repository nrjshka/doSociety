from __future__ import unicode_literals

from django.db import models
# from society.models import User

class vkGroup(models.Model):
	# users = models.ManyToManyField(User, related_name = "users")
	url = models.CharField(max_length = 100)

	def str(self):
		return "VK URL - {}".format(self.url)