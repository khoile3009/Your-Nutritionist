# Generated by Django 3.0.5 on 2020-07-27 19:26

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('social', '0004_comment_like'),
    ]

    operations = [
        migrations.RenameField(
            model_name='comment',
            old_name='rater',
            new_name='commenter',
        ),
    ]
