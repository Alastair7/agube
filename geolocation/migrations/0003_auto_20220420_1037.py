# Generated by Django 3.1.5 on 2022-04-20 10:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('geolocation', '0002_auto_20220419_1700'),
    ]

    operations = [
        migrations.AlterField(
            model_name='geolocation',
            name='latitude',
            field=models.DecimalField(decimal_places=7, max_digits=12),
        ),
        migrations.AlterField(
            model_name='geolocation',
            name='longitude',
            field=models.DecimalField(decimal_places=7, max_digits=12),
        ),
    ]
