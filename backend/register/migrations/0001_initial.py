# Generated by Django 5.2.2 on 2025-06-23 06:15

import django.db.models.deletion
import register.models
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='ClientModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=25, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='MountingComponent',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=25, unique=True)),
                ('axle', models.CharField(choices=[('Rear', 'Rear'), ('Front', 'Front')], default='Front', max_length=5)),
            ],
        ),
        migrations.CreateModel(
            name='BushingRegister',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('custom_pn', models.CharField(max_length=100, unique=True)),
                ('client_pn', models.CharField(blank=True, max_length=500, null=True)),
                ('decommissioned', models.BooleanField(default=False)),
                ('storage_locker', models.CharField(max_length=100)),
                ('velocity', models.FloatField(default=0.53, max_length=10)),
                ('stiffness_x', models.JSONField(default=register.models.get_default_x_list, validators=[register.models.validate_stiffness])),
                ('stiffness_y', models.JSONField(default=register.models.get_default_y_list, validators=[register.models.validate_stiffness])),
                ('comment', models.CharField(blank=True, max_length=500, null=True)),
                ('created_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='created_by', to=settings.AUTH_USER_MODEL)),
                ('updated_by', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='updated_by', to=settings.AUTH_USER_MODEL)),
                ('mounting_component', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='mounting_component', to='register.mountingcomponent')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='FileModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('file', models.FileField(upload_to='photos/', validators=[register.models.validate_file_format, register.models.validate_file_size])),
                ('bushing', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='photos', to='register.bushingregister')),
            ],
        ),
        migrations.CreateModel(
            name='ProjectModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=25, unique=True)),
                ('client', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='register.clientmodel')),
            ],
        ),
        migrations.AddField(
            model_name='bushingregister',
            name='project',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='project', to='register.projectmodel'),
        ),
    ]
