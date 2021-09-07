# Generated by Django 3.1.13 on 2021-09-07 13:30

import django.contrib.postgres.fields
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('factual', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='hero',
            name='age',
            field=models.TextField(choices=[('0-25', '0-25'), ('26-35', '26-35'), ('36-45', '36-45'), ('46-55', '46-55'), ('56-65', '56-65'), ('65+', '65+'), ('UNKNOWN', 'Unknown')], default='UNKNOWN', max_length=7),
        ),
        migrations.AddField(
            model_name='hero',
            name='appearance',
            field=models.BooleanField(null=True),
        ),
        migrations.AddField(
            model_name='hero',
            name='focaliser',
            field=models.BooleanField(null=True),
        ),
        migrations.AddField(
            model_name='hero',
            name='gender',
            field=models.TextField(choices=[('MALE', 'Male'), ('FEMALE', 'Female'), ('OTHER', 'Other'), ('UNKNOWN', 'Unknown')], default='UNKNOWN', max_length=7),
        ),
        migrations.AddField(
            model_name='hero',
            name='hobbies',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.CharField(max_length=200), default=list, size=None),
        ),
        migrations.AddField(
            model_name='hero',
            name='narrator',
            field=models.BooleanField(null=True),
        ),
        migrations.AddField(
            model_name='hero',
            name='pets',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.CharField(max_length=200), default=list, size=None),
        ),
        migrations.AddField(
            model_name='hero',
            name='problems',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.CharField(max_length=200), default=list, size=None),
        ),
        migrations.AddField(
            model_name='hero',
            name='relatives',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.CharField(choices=[('PARENTS_PRESENT', 'parents present'), ('PARENTS_ABSENT', 'parents absent'), ('SIBLINGS_PRESENT', 'siblings present'), ('SIBLINGS_ABSENT', 'siblings absent'), ('UNKNOWN', 'unknown')], max_length=200), default=list, size=None),
        ),
        migrations.AddField(
            model_name='hero',
            name='sex',
            field=models.BooleanField(null=True),
        ),
        migrations.AddField(
            model_name='hero',
            name='solutions',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.CharField(max_length=200), default=list, size=None),
        ),
        migrations.AddField(
            model_name='hero',
            name='wealth',
            field=models.TextField(choices=[('RICH', 'Rich'), ('INBETWEEN', 'In between'), ('POOR', 'Poor'), ('UNKNOWN', 'Unknown')], default='UNKNOWN', max_length=16),
        ),
        migrations.AlterField(
            model_name='hero',
            name='education',
            field=models.TextField(choices=[('HIGH', 'high'), ('LOW', 'low'), ('NONE', 'none'), ('UNKNOWN', 'unknown')], default='unknown', max_length=7),
        ),
        migrations.AlterField(
            model_name='hero',
            name='profession',
            field=models.TextField(default='unknown', max_length=200),
        ),
        migrations.AlterField(
            model_name='hero',
            name='role',
            field=models.CharField(choices=[('PROTAGONIST', 'protagonist'), ('MAIN', 'main character'), ('MINOR', 'minor character')], max_length=11),
        ),
        migrations.AlterField(
            model_name='hero',
            name='work',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='heroes', to='factual.work'),
        ),
    ]
