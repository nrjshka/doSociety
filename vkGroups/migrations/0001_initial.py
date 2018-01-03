# -*- coding: utf-8 -*-
# Generated by Django 1.9 on 2018-01-03 13:09
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='vkGroup',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('url', models.CharField(max_length=100)),
                ('status', models.IntegerField(default=0)),
                ('description', models.CharField(default='', max_length=500)),
            ],
        ),
    ]
