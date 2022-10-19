# Generated by Django 3.1.5 on 2022-05-12 16:21

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        ('dwelling', '0004_moved_owner_to_his_own_module'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Owner',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('release_date', models.DateTimeField()),
                ('discharge_date', models.DateTimeField(null=True)),
                ('dwelling', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='dwelling.dwelling')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'agube_owner_owner',
            },
        ),
    ]
