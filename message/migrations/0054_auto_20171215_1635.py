# -*- coding: utf-8 -*-
# Generated by Django 1.9 on 2017-12-15 13:35
from __future__ import unicode_literals

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('message', '0053_auto_20171215_1635'),
    ]

    operations = [
        migrations.AlterField(
            model_name='message',
            name='time',
            field=models.DateTimeField(default=datetime.datetime(2017, 12, 15, 13, 35, 40, 242000, tzinfo=utc)),
        ),
    ]
