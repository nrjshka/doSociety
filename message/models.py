#!/usr/bin/python
# -*- coding: utf-8 -*-

from __future__ import unicode_literals
from datetime import datetime

from django.db import models
from society.models import User

#здесь описана модель сообщения

class Message(models.Model):
	sender = models.ManyToManyField(User, related_name = "sender")
	receiver = models.ManyToManyField(User, related_name = "receiver")
	text = models.TextField()
	time = models.DateTimeField(default = datetime.now())

	def __str__(self):
		return self.sender.all()[0].name + " " + self.sender.all()[0].surname + " -> " + self.receiver.all()[0].name + " " + self.receiver.all()[0].surname + " : " + self.text
