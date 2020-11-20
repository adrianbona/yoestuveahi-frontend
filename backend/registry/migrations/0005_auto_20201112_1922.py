# Generated by Django 3.1.3 on 2020-11-12 19:22

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('location', '0004_location_created_at'),
        ('registry', '0004_auto_20201112_0116'),
    ]

    operations = [
        migrations.AlterField(
            model_name='registry',
            name='included_in',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='checkins', to='location.location'),
        ),
    ]
