from django.contrib import admin

from .models import Hero, Work


@admin.register(Work)
class WorkAdmin(admin.ModelAdmin):
    model = Work


@admin.register(Hero)
class HeroAdmin(admin.ModelAdmin):
    model = Hero
