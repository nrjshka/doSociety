# -*- coding: utf-8 -*-
# Generated by Django 1.9 on 2017-12-19 14:08
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('society', '0020_auto_20171217_1401'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='citations',
            field=models.ManyToManyField(related_name='citations', to='quote.Quote'),
        ),
    ]
