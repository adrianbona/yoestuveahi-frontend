# Generated by Django 3.1.3 on 2020-11-14 18:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('exam', '0002_test_is_positive'),
    ]

    operations = [
        migrations.AddField(
            model_name='test',
            name='processed',
            field=models.BooleanField(default=False),
        ),
    ]
