from __future__ import unicode_literals

from django.db import models
# from society.models import User

class vkGroup(models.Model):
	# users = models.ManyToManyField(User, related_name = "users")
	url = models.CharField(max_length = 100)
	'''
		0 = Not initialized
		1 = initialize 
	'''	
	status = models.IntegerField(max_length = 10, default = 0)
	description = models.CharField(max_length = 500,default = "")

	def str(self):
		return "VK URL - {}".format(self.url)