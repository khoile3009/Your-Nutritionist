# Generated by Django 3.0.5 on 2020-04-28 19:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cookbook', '0008_auto_20200428_1538'),
    ]

    operations = [
        migrations.AlterField(
            model_name='section',
            name='part',
            field=models.IntegerField(choices=[(0, 'Ingredients'), (1, 'Steps')]),
        ),
    ]
