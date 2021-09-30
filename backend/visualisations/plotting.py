from typing import Counter
from factual.models import Hero, Response, Work
from django.utils import timezone

UU_COLOURS = {
    'yellow': '#FFCD00',
    'red': '#C00A35',
    'cream': '#FFE6AB',
    'orange': '#F3965E', 
    'burgundy': '#AA1555',
    'brown': '#6E3B23',
    'green': '#24A793',  
    'blue': '#5287C6',
    'dark blue': '#001240',
    'purple': '#5B2182'
}

DEFAULT_PALETTE = [UU_COLOURS[colour] for colour in ['green', 'yellow', 'purple', 'blue', 'red', 'orange', 'dark blue', 'burgundy', 'cream',  'brown',]] + ['#808080']
GENDER_PALETTE = [UU_COLOURS['blue'], UU_COLOURS['red'], '#808080']
YESNO_PALETTE = [UU_COLOURS['green'], UU_COLOURS['orange'], '#808080']

STANDARD_MEDIA = ['novel', 'film', 'tv-series', 'vlog', 'comic', 'fan fiction', 'music', 'ballet', 'game']
STANDARD_ENVIRONMENTS = ['countryside', 'village', 'city', 'extra-terrestrial', 'unknown']

class Plots:
    def _work_qualifies(work, filters):
        # has responses
        if not len(work.responses.all()):
            return False
        
        # medium
        if 'work_medium' in filters:
            if work.medium in STANDARD_MEDIA:
                if not work.medium in filters['work_medium']:
                    return False
            else:
                if not 'other' in filters['work_medium']:
                    return False
        
        # has at least one qualifying hero
        hero_filters = {key: filters[key] for key in filters.keys() if key.startswith('hero')}
        if len(hero_filters) > 0:
            has_qualifying_hero = any(Plots._hero_qualifies(hero, hero_filters) for hero in work.heroes.all())
            if not has_qualifying_hero:
                return False

        return True

    def _all_works(filters = dict()):
        if filters:
            works = Work.objects.all()
            filtered_works = [work for work in works if Plots._work_qualifies(work, filters)]
            return filtered_works
        else:
            return Work.objects.all()

    def _hero_qualifies(hero, filters):
        #has responses
        if not len(hero.responses.all()):
            return False
        
        #gender
        if 'hero_gender' in filters:
            if not hero.gender in filters['hero_gender']:
                return False
        
        #work matches
        work_keys = {key: filters[key] for key in filters.keys() if key.startswith('work')}
        if len(work_keys) > 0:
            if not Plots._work_qualifies(hero.work, work_keys):
                return False

        return True

    def _all_heroes(filters = dict()):
        if filters:
            heroes = Hero.objects.all()            
            filtered_heroes = [hero for hero in heroes if Plots._hero_qualifies(hero, filters)]
            return filtered_heroes
        else:
            return Hero.objects.all()

    def _response_qualifies(response, filters):
        #work matches
        work_keys = {key: filters[key] for key in filters.keys() if key.startswith('work')}
        if len(work_keys) > 0:
            if not Plots._work_qualifies(response.work, work_keys):
                return False
        
        #hero matches
        hero_keys = {key: filters[key] for key in filters.keys() if key.startswith('hero')}
        if len(work_keys) > 0:
            if not Plots._hero_qualifies(response.hero, hero_keys):
                return False

        return True

    def _all_responses(filters = dict()):
        if filters:
            responses = Response.objects.all()            
            filtered_responses = [response for response in responses if Plots._response_qualifies(response, filters)]
            return filtered_responses
        else:
            return Response.objects.all()

    def medium_plotdata(works, heroes, responses):
        medium_counts = Counter(work.medium if work.medium in STANDARD_MEDIA else 'other' for work in works )
        labels = STANDARD_MEDIA + ['other']

        data = {
            'labels': labels,
            'datasets': [{
                'data': [medium_counts[medium] for medium in labels],
                'backgroundColor': DEFAULT_PALETTE[:len(labels)],
            }]
        }

        return data

    def _top_10_counts_with_other(values):
        counts_all = Counter(values)
        top10 = {value : count for (value, count) in counts_all.most_common(10)}
        other_count = sum(counts_all[value] for value in counts_all if value not in top10)
        if other_count:
            labels = [value for (value, count) in counts_all.most_common(10)] + ['other']
            counts = {**top10, 'other' : other_count}
        else:
            labels = [value for (value, count) in counts_all.most_common(10)]
            counts = top10
        
        return labels, counts
    
    def pubcountry_plotdata(works, heroes, responses):
        labels, counts = Plots._top_10_counts_with_other(work.pub_country for work in works)

        data = {
            'labels': labels,
            'datasets': [{
                'data': [counts[label] for label in labels],
                'backgroundColor': DEFAULT_PALETTE[:len(labels)],
            }]
        }

        return data

    def pubyear_plotdata(works, heroes, responses):
        counts = Counter(work.pub_year for work in works)

        min_year = min(counts.keys())
        this_year = timezone.now().year
        step = min(1, int((this_year - min_year) / 10))
        labels = list(range(min_year - (2*step) + 1, this_year - step + 1, step))

        value = lambda year: sum(counts[y] for y in range(year, year+step) if y in counts)

        data = {
            'labels': ['{} - {}'.format(year, year+step) for year in labels],
            'datasets': [{
                'label': 'works',
                'data': [value(year) for year in labels],
                'fill': True,
                'borderColor': DEFAULT_PALETTE[0],
                'backgroundColor': 'rgba(36,167,147,0.5)',
            }]
        }

        return data


    
    def environment_plotdata(works, heroes, responses):
        counts = Counter(work.environment if work.environment in STANDARD_ENVIRONMENTS else 'other' for work in works )
        labels = STANDARD_ENVIRONMENTS + ['other']

        data = {
            'labels': labels,
            'datasets': [{
                'data': [counts[label] for label in labels],
                'backgroundColor': DEFAULT_PALETTE[:len(labels)],
            }]
        }

        return data
    
    def adaptation_plotdata(works, heroes, responses):
        nice_strings = {
            True: 'source text',
            False: 'adaptation'
        }

        counts = Counter(nice_strings[work.is_source] for work in works )
        labels = ['source text', 'adaptation']

        data = {
            'labels': labels,
            'datasets': [{
                'data': [counts[label] for label in labels],
                'backgroundColor': DEFAULT_PALETTE[:len(labels)],
            }]
        }

        return data

    def gender_plotdata(works, heroes, responses):
        gender_counts = Counter(hero.get_gender_display().lower() for hero in heroes)
        labels = ['male', 'female', 'other']

        data = {
            'labels': labels,
            'datasets': [{
                'data': [gender_counts[gender] for gender in labels],
                'backgroundColor': GENDER_PALETTE,
            }]
        }

        return data
    
    def role_plotdata(works, heroes, responses):
        counts = Counter(hero.get_role_display().lower() for hero in heroes)
        labels = ['major character', 'minor character']

        data = {
            'labels': labels,
            'datasets': [{
                'data': [counts[role] for role in labels],
                'backgroundColor': DEFAULT_PALETTE[:len(labels)],
            }]
        }

        return data
    
    def narrator_plotdata(works, heroes, responses):
        nice_strings = {
            False: 'no',
            True: 'yes'
        }

        counts = Counter(nice_strings[hero.narrator] for hero in heroes)
        labels = ['yes', 'no']

        data = {
            'labels': labels,
            'datasets': [{
                'data': [counts[label] for label in labels],
                'backgroundColor': YESNO_PALETTE[:len(labels)],
            }]
        }

        return data
    
    def focaliser_plotdata(works, heroes, responses):
        nice_strings = {
            False: 'no',
            True: 'yes'
        }

        counts = Counter(nice_strings[hero.focaliser] for hero in heroes)
        labels = ['yes', 'no']

        data = {
            'labels': labels,
            'datasets': [{
                'data': [counts[label] for label in labels],
                'backgroundColor': YESNO_PALETTE[:len(labels)],
            }]
        }

        return data

    def education_plotdata(works, heroes, responses):
        counts = Counter(hero.get_education_display().lower() for hero in heroes)
        labels = ['high', 'low', 'none', 'unknown']

        data = {
            'labels': labels,
            'datasets': [{
                'data': [counts[role] for role in labels],
                'backgroundColor': DEFAULT_PALETTE[:len(labels)],
            }]
        }

        return data
    
    def wealth_plotdata(works, heroes, responses):
        counts = Counter(hero.get_wealth_display().lower() for hero in heroes)
        labels = ['rich', 'in between', 'poor', 'unknown']

        data = {
            'labels': labels,
            'datasets': [{
                'data': [counts[role] for role in labels],
                'backgroundColor': DEFAULT_PALETTE[:len(labels)],
            }]
        }

        return data

    def country_origin_plotdata(works, heroes, responses):
        labels, counts = Plots._top_10_counts_with_other(hero.country_origin for hero in heroes)

        data = {
            'labels': labels,
            'datasets': [{
                'data': [counts[label] for label in labels],
                'backgroundColor': DEFAULT_PALETTE[:len(labels)],
            }]
        }

        return data

    def country_growup_plotdata(works, heroes, responses):
        labels, counts = Plots._top_10_counts_with_other(hero.country_growup for hero in heroes)

        data = {
            'labels': labels,
            'datasets': [{
                'data': [counts[label] for label in labels],
                'backgroundColor': DEFAULT_PALETTE[:len(labels)],
            }]
        }

        return data
    
    def country_live_plotdata(works, heroes, responses):
        labels, counts = Plots._top_10_counts_with_other(hero.country_live for hero in heroes)

        data = {
            'labels': labels,
            'datasets': [{
                'data': [counts[label] for label in labels],
                'backgroundColor': DEFAULT_PALETTE[:len(labels)],
            }]
        }

        return data

    def profession_plotdata(works, heroes, responses):
        labels, counts = Plots._top_10_counts_with_other(hero.get_profession_display() for hero in heroes)

        data = {
            'labels': labels,
            'datasets': [{
                'data': [counts[label] for label in labels],
                'backgroundColor': DEFAULT_PALETTE[:len(labels)],
            }]
        }

        return data
    
    def attractive_plotdata(works, heroes, responses):
        nice_strings = {
            False: 'no',
            True: 'yes',
            None: 'unknown'
        }

        counts = Counter(nice_strings[hero.appearance] for hero in heroes)
        labels = ['yes', 'no', 'unknown']

        data = {
            'labels': labels,
            'datasets': [{
                'data': [counts[label] for label in labels],
                'backgroundColor': YESNO_PALETTE[:len(labels)],
            }]
        }

        return data

    def age_plotdata(works, heroes, responses):
        age_counts = Counter(hero.age for hero in heroes if hero.age != 'UNKNOWN')
        ages = ['0-25', '26-35', '36-45', '46-55', '56-65', '65+']
        total = sum(age_counts.values())

        data = {
            'labels': ages,
            'datasets': [{
                'label': 'percentage of characters',
                'backgroundColor': DEFAULT_PALETTE[0],
                'data': [round(100 * age_counts[age] / total) for age in ages]
            }]
        }
        return data
    
    def response_gender_plotdata(works, heroes, responses):
        gender_counts = Counter(response.responses['participant_gender'].lower() for response in responses)
        labels = ['male', 'female', 'other']

        data = {
            'labels': labels,
            'datasets': [{
                'data': [gender_counts[gender] for gender in labels],
                'backgroundColor': GENDER_PALETTE,
            }]
        }

        return data
    
    def likert_plotdata(field, works, heroes, responses):
        counts = Counter(response.responses[field] for response in responses if field in response.responses)
        labels = list(range(1,8))

        data = {
            'labels': labels,
            'datasets': [{
                'label': 'responses',
                'data': [counts[value] for value in labels],
                'backgroundColor': DEFAULT_PALETTE[0],
            }]
        }

        return data

    def all_plotdata(filters=dict()):
        works = Plots._all_works(filters)
        heroes = Plots._all_heroes(filters)
        responses = Plots._all_responses(filters)

        plot_names = {
            'work_medium': Plots.medium_plotdata,
            'work_pub_country': Plots.pubcountry_plotdata,
            'work_pub_year': Plots.pubyear_plotdata,
            'work_environment': Plots.environment_plotdata,
            'work_adaptation': Plots.adaptation_plotdata,
            'hero_age': Plots.age_plotdata,
            'hero_gender': Plots.gender_plotdata,
            'hero_role': Plots.role_plotdata,
            'hero_narrator': Plots.narrator_plotdata,
            'hero_focaliser': Plots.focaliser_plotdata,
            'hero_education': Plots.education_plotdata,
            'hero_wealth': Plots.wealth_plotdata,
            'hero_country_origin': Plots.country_origin_plotdata,
            'hero_country_growup': Plots.country_growup_plotdata,
            'hero_country_live': Plots.country_live_plotdata,
            'hero_profession': Plots.profession_plotdata,
            'hero_attractive': Plots.attractive_plotdata,
            'response_gender': Plots.response_gender_plotdata,
        }

        likert_names = [
            'identification_personality',
            'identification_intruiging',
            'identification_wishbelike',
            'appearance_beautiful',
            'appearance_wishlookedlike',
            'appearance_influencefeelings',
            'appearance_impact',
            'appearance_aware',
            'gender_definespersonality',
            'gender_embraces',
            'gender_attempts_expectations',
            'gender_struggles_expectations',
            'agency_responsible',
            'agency_independent',
            'agency_hindered',
            'agency_environment',
            'agency_development',
            'profession_relevant_to_personality',
            'profession_social_status',
            'profession_growth',
            'profession_defines_life',
            'personality_assertive',
            'personality_independent',
            'personality_vain',
            'personality_confident',
            'personality_wellrounded',
            'personality_honest',
            'personality_loyal',
            'personality_cooperative',
        ]

        all_data = {
            'n_works': len(works),
            'n_heroes': len(heroes),
            'n_responses': len(responses),
            **{name: plot_names[name](works=works, heroes=heroes, responses=responses) for name in plot_names},
            **{'response_' + field: Plots.likert_plotdata(field, works=works, heroes=heroes, responses=responses) for field in likert_names},
        }

        return all_data
