from factual.models import Work, Hero, Response
import re

WORK_FIELDS = [
    { 
        'name': 'index',
        'func': lambda work : work.id,
    },{
        'name': 'title',
        'func': lambda work: work.title,
    },{
        'name': 'author',
        'func':  lambda work: work.author,
    },{
        'name': 'medium',
        'func': lambda work: work.medium,
    },{
        'name': 'publication year',
        'func': lambda work: work.pub_year,
    },{
        'name': 'publication country',
        'func': lambda work: work.pub_country,
    },{
        'name': 'source or adaptation',
        'func': lambda work: 'source' if work.is_source else 'adaptation'
    },{
        'name': 'adaptation of',
        'func': lambda work: work.adaptation_of,
    },{
        'name': 'adaptation of (index)',
        'func': lambda work: work.adaptation_of.id if work.adaptation_of else ''
    },{
        'name': 'environment',
        'func': lambda work: work.environment,
    },{
        'name': 'number of heroes',
        'func': lambda work: len(work.heroes.all()),
    },{
        'name': 'number of responses',
        'func': lambda work: len(work.responses.all()),
    }]

relative_format = {
        'PARENTS_PRESENT': 'parents (present)',
        'PARENTS_ABSENT': 'parents (absent)', 
        'SIBLINGS_PRESENT': 'siblings (present)', 
        'SIBLINGS_ABSENT': 'siblings (absent)', 
        'UNKNOWN': 'unknown',
        'NONE': 'none',
    }

HERO_FIELDS = [
    {
        'name': 'index',
        'func': lambda hero: hero.id
    },{
        'name': 'name',
        'func': lambda hero: hero.name
    },{
        'name': 'role',
        'func': lambda hero: hero.get_role_display(),
    },{
        'name': 'is narrator',
        'func': lambda hero: hero.narrator,
    },{
        'name': 'is focaliser',
        'func': lambda hero: hero.focaliser,
    },{
        'name': 'gender',
        'func': lambda hero:  hero.get_gender_display()
    },{
        'name': 'age',
        'func': lambda hero: hero.age,
    },{
        'name': 'country (origin)',
        'func': lambda hero: hero.country_origin,
    },{
        'name': 'country (growing up)',
        'func': lambda hero: hero.country_growup,
    },{
        'name': 'country (living)',
        'func': lambda hero: hero.country_live,
    },{
        'name': 'hobbies',
        'func': lambda hero: ', '.join(hero.hobbies),
    },{
        'name': 'pets',
        'func': lambda hero: ', '.join(hero.pets), 
    },{
        'name': 'education',
        'func': lambda hero: hero.get_education_display(),
    },{
        'name': 'profession',
        'func': lambda hero: hero.get_profession_display(),
    },{
        'name': 'considered beautiful',
        'func': lambda hero: hero.appearance,
    },{
        'name': 'sexual relations described',
        'func': lambda hero: hero.sex,
    },{
        'name': 'relatives',
        'func': lambda hero: ', '.join(relative_format[relative] for relative in hero.relatives)
    },{
        'name': 'wealth',
        'func': lambda hero: hero.get_wealth_display(),
    },{
        'name': 'problems',
        'func': lambda hero: ', '.join(hero.problems), 
    },{
        'name': 'solutions',
        'func': lambda hero: ', '.join(hero.solutions),
    },{
        'name': 'number of responses',
        'func': lambda hero: len(hero.responses.all()),
    }]


RESPONSE_FIELDS = [
    {
        'name': 'index',
        'func': lambda response: response.id
    },{
        'name': 'gender',
        'func': lambda response: response.responses['participant_gender'],
    },{
        'name': 'age',
        'func': lambda response: response.responses['participant_age'],
    },{
        'name': 'nationality',
        'func': lambda response: response.responses['participant_nationality'],
    },{
        'name': 'identification: personality',
        'func': lambda response: response.responses['identification_personality'],
    },{
        'name': 'identification: intruiging',
        'func': lambda response: response.responses['identification_intruiging'],
    },{
        'name': 'identification:  wish to be like',
        'func': lambda response: response.responses['identification_wishbelike'],
    },{
        'name': 'appearance: beautiful',
        'func': lambda response: response.responses['appearance_beautiful'] if response.responses['appearance_enable'] else '',
    },{
        'name': 'appearance: wish to look like',
        'func': lambda response: response.responses['appearance_wishlookedlike'] if response.responses['appearance_enable'] else '',
    },{
        'name': 'appearance: influence feelings',
        'func': lambda response: response.responses['appearance_influencefeelings'] if response.responses['appearance_enable'] else '',
    },{
        'name': 'appearance: impact',
        'func': lambda response: response.responses['appearance_impact'] if response.responses['appearance_enable'] else '',
    },{
        'name': 'appearance: aware',
        'func': lambda response: response.responses['appearance_aware'] if response.responses['appearance_enable'] else '',
    },{
        'name': 'gender: defines personality',
        'func': lambda response: response.responses['gender_definespersonality'],
    },{
        'name': 'gender: embraces',
        'func': lambda response: response.responses['gender_embraces'],
    },{
        'name': 'gender: attempts expectations',
        'func': lambda response: response.responses['gender_attempts_expectations'],
    },{
        'name': 'gender: struggles expectations',
        'func': lambda response: response.responses['gender_struggles_expectations'],
    },{
        'name': 'agency: responsible',
        'func': lambda response: response.responses['agency_responsible'],
    },{
        'name': 'agency: independent',
        'func': lambda response: response.responses['agency_independent'],
    },{
        'name': 'agency: hindered',
        'func': lambda response: response.responses['agency_hindered'],
    },{
        'name': 'agency: environment',
        'func': lambda response: response.responses['agency_environment'],
    },{
        'name': 'agency: development',
        'func': lambda response: response.responses['agency_development'],
    },{
        'name': 'profession: relevant to personality',
        'func': lambda response: response.responses['profession_relevant_to_personality'] if response.responses['profession_enable'] else '',
    },{
        'name': 'profession: social status',
        'func': lambda response: response.responses['profession_social_status'] if response.responses['profession_enable'] else '',
    },{
        'name': 'profession: growth',
        'func': lambda response: response.responses['profession_growth'] if response.responses['profession_enable'] else '',
    },{
        'name': 'profession: defines life',
        'func': lambda response: response.responses['profession_defines_life'] if response.responses['profession_enable'] else '',
    },{
        'name': 'personality: assertive',
        'func': lambda response: response.responses['personality_assertive'],
    },{
        'name': 'personality: independent',
        'func': lambda response: response.responses['personality_independent'],
    },{
        'name': 'personality: vain',
        'func': lambda response: response.responses['personality_vain'],
    },{
        'name': 'personality: confident',
        'func': lambda response: response.responses['personality_confident'],
    },{
        'name': 'personality: well-rounded',
        'func': lambda response: response.responses['personality_wellrounded'],
    },{
        'name': 'personality: honest',
        'func': lambda response: response.responses['personality_honest'],
    },{
        'name': 'personality: loyal',
        'func': lambda response: response.responses['personality_loyal'],
    },{
        'name': 'personality: cooperative',
        'func': lambda response: response.responses['personality_cooperative'],
    },
    ]

def format_tsv(lines):
    format = lambda item: re.sub(r'\s+', ' ', str(item))
    formatted = '\n'.join(
        ['\t'.join(format(item) for item in line) for line in lines]
        )
    return formatted

def download_works():
    header = [field['name'] for field in WORK_FIELDS]
    lines = [header]

    works = Work.objects.all()
    for work in works:
        items = [field['func'](work) for field in WORK_FIELDS]
        lines.append(items)
    
    data = format_tsv(lines)
    return data

def download_heroes():
    work_fields = ['work: ' + field['name'] for field in WORK_FIELDS]
    hero_fields = [field['name'] for field in HERO_FIELDS]
    header = hero_fields[:2] + work_fields + hero_fields[2:]
    lines = [header]

    heroes = Hero.objects.all()
    for hero in heroes:
        work_items = [field['func'](hero.work) for field in WORK_FIELDS]
        items = [field['func'](hero) for field in HERO_FIELDS]
        items = items[:2] + work_items + items[2:]
        lines.append(items)
    
    data = format_tsv(lines)
    return data

def download_responses():
    work_fields = ['work: ' + field['name'] for field in WORK_FIELDS]
    hero_fields = [field['name'] for field in HERO_FIELDS]
    response_fields = [field['name'] for field in RESPONSE_FIELDS]
    header = response_fields[:1] + work_fields + hero_fields + response_fields[1:]
    lines = [header]

    responses = Response.objects.all()
    for response in responses:
        work_items = [field['func'](response.work) for field in WORK_FIELDS]
        hero_items = [field['func'](response.hero) for field in HERO_FIELDS]
        items = [field['func'](response) for field in RESPONSE_FIELDS]
        items = items[:2] + work_items + hero_items + items[2:]
        lines.append(items)
    
    data = format_tsv(lines)
    return data