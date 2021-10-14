import pytest
from .plotting import Plots
from factual.models import Work, Hero, Response

@pytest.mark.django_db
def test_empty_dataset():
    plots = Plots.all_plotdata()
    assert plots['n_works'] == 0
    assert plots['n_heroes'] == 0
    assert plots['n_responses'] == 0
    assert len(plots) == 3

@pytest.mark.django_db
def test_filters(fake_data):
    #no filters
    plots = Plots.all_plotdata()
    assert plots['n_works'] == len(Work.objects.all())
    assert plots['n_heroes'] == len(Hero.objects.all())
    assert plots['n_responses'] == len(Response.objects.all())

    #gender filter
    plots = Plots.all_plotdata({'hero_gender': ['MALE']})
    assert plots['n_heroes'] == 1

    #medium filter
    plots = Plots.all_plotdata({'work_medium': ['novel']})
    assert plots['n_works'] == 1

    #source/adapatation filter
    plots = Plots.all_plotdata({'work_is_source': [True]})
    assert plots['n_works'] == 1

    # filter with no matches
    plots = Plots.all_plotdata({'work_medium': ['other']})
    assert plots['n_works'] == 0

@pytest.mark.django_db
@pytest.fixture
def fake_data():
    Work.objects.create(
        medium = 'novel',
        title = 'A book',
        author = 'Someone',
        pub_year = 2021,
        pub_country = 'The Netherlands',
        is_source = True,
        adaptation_of = None,
        environment = 'unknown'
    )

    Work.objects.create(
        medium = 'film',
        title = 'A film',
        author = 'Someone',
        pub_year = 2021,
        pub_country = 'The Netherlands',
        is_source = False,
        adaptation_of = Work.objects.all()[0],
        environment = 'unknown'
    )

    Hero.objects.create(
        name = 'A hero',
        work = Work.objects.all()[0],
        role = 'MAJOR',
        narrator = True,
        focaliser= True,
        gender = 'MALE',
        age = '0-25',
        country_origin = 'The Netherlands',
        country_growup = 'The Netherlands',
        country_live = 'The Netherlands',
        hobbies = [],
        pets = [],
        education = 'UNKNOWN',
        profession = 'UNKNOWN',
        appearance = True,
        sex = True,
        relatives = [],
        wealth = 'UNKNOWN',
        problems = [],
        solutions = [],
    )

    Hero.objects.create(
        name = 'A hero',
        work = Work.objects.all()[1],
        role = 'MAJOR',
        narrator = True,
        focaliser= True,
        gender = 'FEMALE',
        age = '0-25',
        country_origin = 'The Netherlands',
        country_growup = 'The Netherlands',
        country_live = 'The Netherlands',
        hobbies = [],
        pets = [],
        education = 'UNKNOWN',
        profession = 'UNKNOWN',
        appearance = True,
        sex = True,
        relatives = [],
        wealth = 'UNKNOWN',
        problems = [],
        solutions = [],
    )

    Response.objects.create(
        work = Hero.objects.all()[0].work,
        hero = Hero.objects.all()[0],
        responses = {
            "agency_hindered": 3,
            "gender_embraces": 6,
            "participant_age": "26-35",
            "appearance_aware": 7,
            "personality_vain": 7,
            "appearance_enable": True,
            "appearance_impact": 5,
            "personality_loyal": 1,
            "profession_enable": True,
            "profession_growth": 4,
            "agency_development": 7,
            "agency_environment": 2,
            "agency_independent": 6,
            "agency_responsible": 5,
            "participant_gender": "Male",
            "personality_honest": 1,
            "appearance_beautiful": 5,
            "personality_assertive": 7,
            "personality_confident": 7,
            "participant_nationality": "Dutch",
            "personality_cooperative": 3,
            "personality_independent": 7,
            "personality_wellrounded": 7,
            "profession_defines_life": 6,
            "profession_social_status": 6,
            "appearance_wishlookedlike": 6,
            "gender_definespersonality": 3,
            "identification_intruiging": 5,
            "identification_wishbelike": 2,
            "identification_personality": 5,
            "appearance_influencefeelings": 5,
            "gender_attempts_expectations": 2,
            "gender_struggles_expectations": 3,
            "profession_relevant_to_personality": 6
        }
    )

    Response.objects.create(
        work = Hero.objects.all()[1].work,
        hero = Hero.objects.all()[1],
        responses = {
            "agency_hindered": 3,
            "gender_embraces": 5,
            "participant_age": "0-25",
            "appearance_aware": 5,
            "personality_vain": 2,
            "appearance_enable": True,
            "appearance_impact": 5,
            "personality_loyal": 7,
            "profession_enable": True,
            "profession_growth": 7,
            "agency_development": 7,
            "agency_environment": 6,
            "agency_independent": 6,
            "agency_responsible": 5,
            "participant_gender": "Other",
            "personality_honest": 6,
            "appearance_beautiful": 6,
            "personality_assertive": 5,
            "personality_confident": 4,
            "participant_nationality": "Dutch",
            "personality_cooperative": 7,
            "personality_independent": 5,
            "personality_wellrounded": 6,
            "profession_defines_life": 7,
            "profession_social_status": 6,
            "appearance_wishlookedlike": 4,
            "gender_definespersonality": 3,
            "identification_intruiging": 4,
            "identification_wishbelike": 5,
            "identification_personality": 6,
            "appearance_influencefeelings": 6,
            "gender_attempts_expectations": 4,
            "gender_struggles_expectations": 2,
            "profession_relevant_to_personality": 6
        }
    )
