# Generated by Django 3.1.2 on 2020-11-05 00:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0004_auto_20201104_2350'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='last_risk_update',
            field=models.DateTimeField(blank=True),
        ),
    ]
