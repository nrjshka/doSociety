# -*- coding: utf-8 -*-
# Generated by Django 1.9 on 2017-12-15 15:52
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('society', '0017_auto_20171215_1805'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='citations',
        ),
    ]
