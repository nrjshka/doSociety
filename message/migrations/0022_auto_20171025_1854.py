# -*- coding: utf-8 -*-
# Generated by Django 1.9 on 2017-10-25 18:54
from __future__ import unicode_literals

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('message', '0021_auto_20171025_1852'),
    ]

    operations = [
        migrations.AlterField(
            model_name='message',
            name='time',
            field=models.DateTimeField(default=datetime.datetime(2017, 10, 25, 18, 54, 13, 910772, tzinfo=utc)),
        ),
    ]
