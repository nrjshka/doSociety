# -*- coding: utf-8 -*-
# Generated by Django 1.9 on 2017-10-19 20:47
from __future__ import unicode_literals

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('message', '0007_auto_20171019_2041'),
    ]

    operations = [
        migrations.AlterField(
            model_name='message',
            name='time',
            field=models.DateTimeField(default=datetime.datetime(2017, 10, 19, 20, 47, 40, 651472, tzinfo=utc)),
        ),
    ]
