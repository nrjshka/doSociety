# -*- coding: utf-8 -*-
# Generated by Django 1.9 on 2017-12-15 14:00
from __future__ import unicode_literals

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('message', '0059_auto_20171215_1655'),
    ]

    operations = [
        migrations.AlterField(
            model_name='message',
            name='time',
            field=models.DateTimeField(default=datetime.datetime(2017, 12, 15, 14, 0, 39, 127000, tzinfo=utc)),
        ),
    ]
