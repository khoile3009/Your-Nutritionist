# Generated by Django 3.0.5 on 2020-08-17 18:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('post', '0002_remove_postmedia_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='number_of_like',
            field=models.IntegerField(default=0),
            preserve_default=False,
        ),
    ]