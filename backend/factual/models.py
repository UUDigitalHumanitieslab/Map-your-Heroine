from django.db import models
from django.contrib.postgres.fields import ArrayField


class Hero(models.Model):
    ROLE_CHOICES = (
        ('PROTAGONIST', 'protagonist'),
        ('MAIN', 'main character'),
        ('MINOR', 'minor character'),
    )
    GENDER_CHOICES =   (('MALE', 'Male'),('FEMALE', 'Female'),('OTHER','Other'),('UNKNOWN','Unknown'))
    AGE_CHOICES = (
        ('0-25', '0-25'), ('26-35', '26-35'), ('36-45', '36-45'), ('46-55', '46-55'), ('56-65', '56-65'), ('65+', '65+'), 
        ('UNKNOWN', 'Unknown'))
    EDUCATION_CHOICES = (
        ('HIGH', 'high'),
        ('LOW', 'low'),
        ('NONE', 'none'),
        ('UNKNOWN', 'unknown'),
    )
    RELATIVES_CHOICES = (
        ('PARENTS_PRESENT', 'parents present'), 
        ('PARENTS_ABSENT', 'parents absent'), 
        ('SIBLINGS_PRESENT', 'siblings present'), 
        ('SIBLINGS_ABSENT', 'siblings absent'), 
        ('UNKNOWN', 'unknown'),
    )
    
    WEALTH_CHOICES = (('RICH', 'Rich'), ('INBETWEEN', 'In between'), ('POOR', 'Poor'), ('UNKNOWN','Unknown'))

    name = models.CharField(max_length=200)
    work = models.ForeignKey(
        'Work', on_delete=models.CASCADE, related_name='heroes')
    
    role = models.CharField(max_length=11, choices=ROLE_CHOICES)
    narrator = models.BooleanField(null=True)
    focaliser = models.BooleanField(null=True)
    
    gender = models.TextField(max_length=7, choices=GENDER_CHOICES, default='UNKNOWN')
    age = models.TextField(max_length=7, choices=AGE_CHOICES, default='UNKNOWN')
    country_origin = models.CharField(max_length=100, default='unknown')
    country_live = models.CharField(max_length=100, default='unknown')
    country_growup = models.CharField(max_length=100, default='unknown')
    hobbies = ArrayField(models.CharField(max_length=200), default=list)
    pets = ArrayField(models.CharField(max_length=200), default=list)

    education = models.TextField(max_length=7, choices=EDUCATION_CHOICES, default='unknown')
    profession = models.TextField(max_length=200, default='unknown')

    appearance = models.BooleanField(null=True)
    sex = models.BooleanField(null=True)
    relatives =  ArrayField(models.CharField(max_length=200, choices=RELATIVES_CHOICES), default=list)
    wealth =  models.TextField(max_length=16, choices=WEALTH_CHOICES, default='UNKNOWN')

    problems = ArrayField(models.CharField(max_length=200), default=list)
    solutions = ArrayField(models.CharField(max_length=200), default=list)

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

    # medium = models.CharField(
    #     max_length=20, choices=MEDIUM_CHOICES, default='NOVEL')
    medium = models.CharField(max_length=20)
    title = models.CharField(max_length=200)
    author = models.CharField(max_length=200)
    pub_year = models.IntegerField()
    pub_country = models.CharField(max_length=200)
    is_source = models.BooleanField(default=True)
    adaptation_of = models.ForeignKey(
        'self', null=True, blank=True, on_delete=models.CASCADE)
    # environment = models.CharField(
    #     max_length=20, choices=ENVIRONMENT_CHOICES, default='UNKNOWN')
    environment = models.CharField(max_length=20)

    def __str__(self):
        return f'{self.title} ({self.medium} - {self.pub_year})'
