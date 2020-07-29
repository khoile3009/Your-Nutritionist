# Generated by Django 3.0.5 on 2020-07-27 15:28

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('post', '0002_remove_postmedia_name'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('social', '0003_auto_20200703_1506'),
    ]

    operations = [
        migrations.CreateModel(
            name='Like',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('from_user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='from_user_like', to=settings.AUTH_USER_MODEL)),
                ('target_post', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='target_post_like', to='post.Post')),
            ],
        ),
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('comment_at', models.DateTimeField(auto_now_add=True)),
                ('content', models.TextField()),
                ('target_id', models.IntegerField()),
                ('target_type', models.IntegerField(choices=[(0, 'post'), (1, 'comment')])),
                ('rater', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]