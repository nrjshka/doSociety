# -*- coding: utf-8 -*-
# Generated by Django 1.9 on 2017-12-13 14:22
from __future__ import unicode_literals

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('message', '0035_auto_20171029_0841'),
    ]

    operations = [
        migrations.AlterField(
            model_name='message',
            name='time',
            field=models.DateTimeField(default=datetime.datetime(2017, 12, 13, 14, 22, 36, 79843, tzinfo=utc)),
        ),
    ]
