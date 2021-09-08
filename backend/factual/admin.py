from django.contrib import admin

from .models import Hero, Response, Work


@admin.register(Work)
class WorkAdmin(admin.ModelAdmin):
    model = Work


@admin.register(Hero)
class HeroAdmin(admin.ModelAdmin):
    model = Hero


@admin.register(Response)
class WorkAdmin(admin.ModelAdmin):
    model = Response
