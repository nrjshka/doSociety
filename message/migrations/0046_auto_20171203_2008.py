# -*- coding: utf-8 -*-
# Generated by Django 1.9 on 2017-12-03 17:08
from __future__ import unicode_literals

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('message', '0045_auto_20171203_1402'),
    ]

    operations = [
        migrations.AlterField(
            model_name='message',
            name='time',
            field=models.DateTimeField(default=datetime.datetime(2017, 12, 3, 17, 8, 4, 847000, tzinfo=utc)),
        ),
    ]
