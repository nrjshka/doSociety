# -*- coding: utf-8 -*-
# Generated by Django 1.9 on 2017-09-09 07:21
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('society', '0005_user_urlid'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='urlid',
            field=models.CharField(default=b'', max_length=100),
        ),
    ]
