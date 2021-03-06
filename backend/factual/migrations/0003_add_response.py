# Generated by Django 3.1.13 on 2021-09-08 07:34

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('factual', '0002_heroform'),
    ]

    operations = [
        migrations.CreateModel(
            name='Response',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('responses', models.JSONField()),
                ('hero', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='responses', to='factual.hero')),
                ('work', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='responses', to='factual.work')),
            ],
        ),
    ]
