# -*- coding: utf-8 -*-
# Generated by Django 1.9 on 2017-12-17 11:19
from __future__ import unicode_literals

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('message', '0039_auto_20171217_1006'),
    ]

    operations = [
        migrations.AlterField(
            model_name='message',
            name='time',
            field=models.DateTimeField(default=datetime.datetime(2017, 12, 17, 11, 19, 23, 487843, tzinfo=utc)),
        ),
    ]
