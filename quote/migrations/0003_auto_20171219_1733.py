# -*- coding: utf-8 -*-
# Generated by Django 1.9 on 2017-12-19 14:33
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('quote', '0002_auto_20171219_1714'),
    ]

    operations = [
        migrations.AlterField(
            model_name='quote',
            name='citation',
            field=models.CharField(max_length=1000),
        ),
    ]
