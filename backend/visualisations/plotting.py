from typing import Counter
from math import pi
from bokeh.models import filters
from bokeh.plotting import figure
from factual.models import Hero, Response, Work
from bokeh.transform import cumsum
from bokeh.palettes import Set2, Paired
import pandas as pd

DEFAULT_PALETTE = Set2[8] + tuple(Paired[12][i] for i in range(0, 12, 2))
STANDARD_MEDIA = ['novel', 'film', 'tv-series', 'vlog', 'comic', 'fan fiction', 'music', 'ballet', 'game']  

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

    def medium_plotdata(filters=dict()):
        works = Plots._all_works(filters)
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

    def _counts_with_other(values):
        counts_all = Counter(values)
        top10 = {country : count for (country, count) in counts_all.most_common(10)}
        other_count = sum(counts_all[country] for country in counts_all if country not in top10)
        if other_count:
            labels = [country for (country, count) in counts_all.most_common(10)] + ['other']
            counts = {**top10, 'other' : other_count}
        else:
            labels = [country for (country, count) in counts_all.most_common(10)]
            counts = top10
        
        return labels, counts
    
    def pubcountry_plotdata(filters=dict()):
        works = Plots._all_works(filters)
        labels, counts = Plots._counts_with_other(work.pub_country for work in works)

        data = {
            'labels': labels,
            'datasets': [{
                'data': [counts[country] for country in labels],
                'backgroundColor': DEFAULT_PALETTE[:len(labels)],
            }]
        }

        return data
    
    def environment_plotdata(filters=dict()):
        works = Plots._all_works(filters)
        labels, counts = Plots._counts_with_other(work.environment for work in works)

        data = {
            'labels': labels,
            'datasets': [{
                'data': [counts[country] for country in labels],
                'backgroundColor': DEFAULT_PALETTE[:len(labels)],
            }]
        }

        return data

    def gender_plotdata(filters=dict()):
        nice_strings = {
            'MALE': 'Male',
            'FEMALE': 'Female',
            'OTHER': 'Other'
        }

        palette = [DEFAULT_PALETTE[2], DEFAULT_PALETTE[10], DEFAULT_PALETTE[0]]

        heroes = Plots._all_heroes(filters)
        gender_counts = Counter(nice_strings[hero.gender] for hero in heroes)
        labels = ['Male', 'Female', 'Other']

        data = {
            'labels': labels,
            'datasets': [{
                'data': [gender_counts[gender] for gender in labels],
                'backgroundColor': palette,
            }]
        }

        return data
    
    def role_plotdata(filters=dict()):
        nice_strings = {
            'MAIN': 'Main character',
            'MINOR': 'Minor character',
            'PROTAGONIST': 'Protagonist'
        }

        heroes = Plots._all_heroes(filters)
        counts = Counter(nice_strings[hero.role] for hero in heroes)
        labels = ['Protagonist', 'Main character', 'Minor character']

        data = {
            'labels': labels,
            'datasets': [{
                'data': [counts[role] for role in labels],
                'backgroundColor': DEFAULT_PALETTE[:len(labels)],
            }]
        }

        return data
    
    def narrator_plotdata(filters=dict()):
        nice_strings = {
            False: 'No',
            True: 'Yes'
        }

        palette = DEFAULT_PALETTE[:2]

        heroes = Plots._all_heroes(filters)
        counts = Counter(nice_strings[hero.narrator] for hero in heroes)
        labels = ['Yes', 'No']

        data = {
            'labels': labels,
            'datasets': [{
                'data': [counts[label] for label in labels],
                'backgroundColor': palette,
            }]
        }

        return data
    
    def focaliser_plotdata(filters=dict()):
        nice_strings = {
            False: 'No',
            True: 'Yes'
        }

        palette = DEFAULT_PALETTE[:2]

        heroes = Plots._all_heroes(filters)
        counts = Counter(nice_strings[hero.focaliser] for hero in heroes)
        labels = ['Yes', 'No']

        data = {
            'labels': labels,
            'datasets': [{
                'data': [counts[label] for label in labels],
                'backgroundColor': palette,
            }]
        }

        return data

    def age_plotdata(filters=dict()):
        heroes = Plots._all_heroes(filters)
        age_counts = Counter(hero.age for hero in heroes if hero.age != 'UNKNOWN')
        ages = ['0-25', '26-35', '36-45', '46-55', '56-65', '65+']

        data = {
            'labels': ages,
            'datasets': [{
                'label': 'number of characters',
                'backgroundColor': DEFAULT_PALETTE[0],
                'data': [age_counts[age] for age in ages]
            }]
        }
        return data
    
    def response_gender_plotdata(filters=dict()):
        palette = [DEFAULT_PALETTE[2], DEFAULT_PALETTE[10], DEFAULT_PALETTE[0]]

        responses = Plots._all_responses(filters)
        gender_counts = Counter(response.responses['participant_gender'] for response in responses)
        labels = ['Male', 'Female', 'Other']

        data = {
            'labels': labels,
            'datasets': [{
                'data': [gender_counts[gender] for gender in labels],
                'backgroundColor': palette,
            }]
        }

        return data
    
    def _likert_plotdata(field, filters=dict()):
        responses = Plots._all_responses(filters)
        counts = Counter(response.responses[field] for response in responses)
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

    def gender_defines_personality_plotdata(filters=dict()):
        return Plots._likert_plotdata('gender_definespersonality', filters)

    def gender_embraces_plotdata(filters=dict()):
        return Plots._likert_plotdata('gender_embraces', filters)

    def gender_attempts_expectations_plotdata(filters=dict()):
        return Plots._likert_plotdata('gender_attempts_expectations', filters)
    
    def gender_struggles_expectations_plotdata(filters=dict()):
        return Plots._likert_plotdata('gender_struggles_expectations', filters)