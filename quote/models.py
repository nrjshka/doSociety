from __future__ import unicode_literals

from django.db import models

class Quote(models.Model):
	citation = models.CharField(max_length = 1000)

	def str(self):
		return "{}".format(self.citation)
	
