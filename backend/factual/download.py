from factual.models import Work, Hero, Response
import re

def format_tsv(lines):
    format = lambda item: re.sub(r'\s+', ' ', str(item))
    formatted = '\n'.join(
        ['\t'.join(format(item) for item in line) for line in lines]
        )
    return formatted

def download_works():
    header = [
        'index', 'title', 'medium', 
        'publication year', 'publication country', 
        'is original', 'adaptation of', 
        'environment'
        ]
    lines = [header]

    works = Work.objects.all()
    for work in works:
        items = [
            work.id, work.title, work.medium, 
            work.pub_year, work.pub_country, 
            work.is_source, work.adaptation_of, 
            work.environment
            ]
        lines.append(items)
    
    data = format_tsv(lines)
    return data

def download_heroes():
    header = [
        'index',
        'name',
        'work title', 'work index',
        'role', 'is narrator', 'is focaliser',
        'gender', 'age',
        'country (origin)', 'country (growing up)', 'country (living)',
        'hobbies', 'pets', 'education', 'profession',
        'considered beautiful', 'sexual relations describes', 'relatives', 'wealth',
        'problems', 'solutions'
        ]
    lines = [header]

    heroes = Hero.objects.all()
    for hero in heroes:
        relative_format = {
            'PARENTS_PRESENT': 'parents (present)',
            'PARENTS_ABSENT': 'parents (absent)', 
            'SIBLINGS_PRESENT': 'siblings (present)', 
            'SIBLINGS_ABSENT': 'siblings (absent)', 
            'UNKNOWN': 'unknown',
        }
        items = [
            hero.id,
            hero.name,
            hero.work.title, hero.work.id,
            hero.get_role_display(), hero.narrator, hero.focaliser,
            hero.get_gender_display(), hero.age,
            hero.country_origin, hero.country_growup, hero.country_live,
            ', '.join(hero.hobbies), ', '.join(hero.pets), hero.get_education_display(), hero.profession,
            hero.appearance, hero.sex, ', '.join(relative_format[relative] for relative in hero.relatives), hero.get_wealth_display(),
            ', '.join(hero.problems), ', '.join(hero.solutions),
            ]
        lines.append(items)
    
    data = format_tsv(lines)
    return data

def download_responses():
    header = [
        'index',
        'work title', 'work index',
        'hero name', 'hero index',
        'gender', 'age', 'nationality',
        'identification: personality', 'identification: intruiging', 'identification: wish to be like',
        'appearance: beautiful', 'appearance: wish to look like', 'appearance: influence feelings', 'appearance: impact', 'appearance: aware',
        'gender: defines personality', 'gender: embraces', 'gender: attempts expectations', 'gender: struggles expectations', 
        'agency: responsible', 'agency: independent', 'agency: hindered', 'agency: environment', 'agency: development',
        'profession: relevant to personality', 'profession: social status', 'profession: growth', 'profession: defines life',
        'personality: assertive', 'personality: independent', 'personality: vain', 'personality: confident', 'personality: well-rounded', 'personality: honest', 'personality: loyal', 'personality: cooperative', 
        ]
    lines = [header]

    responses = Response.objects.all()
    for response in responses:
        items = [
            response.id,
            response.work.title, response.work.id,
            response.hero.name, response.hero.id,
            response.responses['participant_gender'], response.responses['participant_age'], response.responses['participant_nationality'],
            response.responses['identification_personality'], response.responses['identification_intruiging'], response.responses['identification_wishbelike'],
            response.responses['appearance_beautiful'], response.responses['appearance_wishlookedlike'], response.responses['appearance_influencefeelings'], response.responses['appearance_impact'], response.responses['appearance_aware'],
            response.responses['gender_definespersonality'], response.responses['gender_embraces'], response.responses['gender_attempts_expectations'], response.responses['gender_struggles_expectations'],
            response.responses['agency_responsible'], response.responses['agency_independent'], response.responses['agency_hindered'], response.responses['agency_environment'], response.responses['agency_development'], 
            response.responses['profession_relevant_to_personality'], response.responses['profession_social_status'], response.responses['profession_growth'], response.responses['profession_defines_life'], 
            response.responses['personality_assertive'], response.responses['personality_independent'], response.responses['personality_vain'], response.responses['personality_confident'], response.responses['personality_wellrounded'], response.responses['personality_honest'], response.responses['personality_loyal'], response.responses['personality_cooperative'], 
        ]
        lines.append(items)
    
    data = format_tsv(lines)
    return data