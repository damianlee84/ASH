# -*- coding: utf-8 -*-
# Generated by Django 1.9 on 2016-04-24 19:04
from __future__ import unicode_literals

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('mainApp', '0002_auto_20160423_0659'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='memory',
            name='Date',
        ),
        migrations.AddField(
            model_name='memory',
            name='EndDate',
            field=models.DateTimeField(default=datetime.datetime(2016, 4, 24, 19, 4, 9, 494264, tzinfo=utc)),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='memory',
            name='StartDate',
            field=models.DateTimeField(default=datetime.datetime(2016, 4, 24, 19, 4, 18, 298933, tzinfo=utc)),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='user',
            name='ProfilePicture',
            field=models.ImageField(upload_to='Profile_Pictures'),
        ),
    ]