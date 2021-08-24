from django.db import models


class Hero(models.Model):
    ROLE_CHOICES = (
        ('PROTAGONIST', 'protagonist'),
        ('MAIN', 'main character'),
        ('MINOR', 'minor character'),
    )
    EDUCATION_CHOICES = (
        ('HIGH', 'high (university, university of applied sciences)'),
        ('LOW', 'low (primary or secondary school, vocational training)'),
    )

    name = models.CharField(max_length=200)
    work = models.ForeignKey('Work', on_delete=models.CASCADE)
    role = models.CharField(
        max_length=11, choices=ROLE_CHOICES, default='PROTAGONIST')

    country_origin = models.CharField(max_length=100, default='unknown')
    country_live = models.CharField(max_length=100, default='unknown')
    country_growup = models.CharField(max_length=100, default='unknown')

    education = models.CharField(max_length=4, choices=EDUCATION_CHOICES)
    profession = models.CharField(max_length=200)

    class Meta:
        unique_together = ('name', 'work')

    def __str__(self):
        return f'{self.name} - {self.work}'


class Work(models.Model):
    MEDIUM_CHOICES = (
        ('NOVEL', 'novel'),
        ('FILM', 'film'),
        ('TVSERIES', 'tv-series'),
        ('VLOG', 'vlog'),
        ('COMIC', 'comic'),
        ('FANFIC', 'fan fiction'),
        ('MUSIC', 'music'),
        ('BALLET', 'ballet'),
        ('GAME', 'game'),
        ('OTHER', 'other'),
    )

    ENVIRONMENT_CHOICES = (
        ('COUNTRYSIDE', 'countryside'),
        ('VILLAGE', 'village'),
        ('CITY', 'city'),
        ('EXTRATERRESTRIAL', 'extra-terrestrial'),
        ('UNKNOWN', 'unknown'),
    )

    medium = models.CharField(
        max_length=20, choices=MEDIUM_CHOICES, default='NOVEL')
    title = models.CharField(max_length=200)
    author = models.CharField(max_length=200)
    pub_year = models.IntegerField()
    pub_country = models.CharField(max_length=200)
    is_source = models.BooleanField(default=True)
    adaptation_of = models.ForeignKey(
        'self', null=True, blank=True, on_delete=models.CASCADE)
    environment = models.CharField(
        max_length=20, choices=ENVIRONMENT_CHOICES, default='UNKNOWN')

    def __str__(self):
        return f'{self.title} ({self.medium} - {self.pub_year})'
