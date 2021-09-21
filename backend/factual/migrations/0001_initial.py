# Generated by Django 3.1.13 on 2021-08-25 12:31

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Work',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('medium', models.CharField(max_length=20)),
                ('title', models.CharField(max_length=200)),
                ('author', models.CharField(max_length=200)),
                ('pub_year', models.IntegerField()),
                ('pub_country', models.CharField(max_length=200)),
                ('is_source', models.BooleanField(default=True)),
                ('environment', models.CharField(max_length=20)),
                ('adaptation_of', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='factual.work')),
            ],
        ),
        migrations.CreateModel(
            name='Hero',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('role', models.CharField(max_length=11)),
                ('country_origin', models.CharField(default='unknown', max_length=100)),
                ('country_live', models.CharField(default='unknown', max_length=100)),
                ('country_growup', models.CharField(default='unknown', max_length=100)),
                ('education', models.CharField(max_length=4)),
                ('profession', models.CharField(max_length=200)),
                ('work', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='factual.work')),
            ],
            options={
                'unique_together': {('name', 'work')},
            },
        ),
    ]
