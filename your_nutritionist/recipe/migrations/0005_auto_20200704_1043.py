# Generated by Django 3.0.5 on 2020-07-04 14:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('recipe', '0004_media_gcloud_bucket_url'),
    ]

    operations = [
        migrations.AlterField(
            model_name='media',
            name='gcloud_bucket_url',
            field=models.CharField(default='', max_length=500),
        ),
    ]
