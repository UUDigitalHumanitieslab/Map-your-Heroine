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
    """
    Defines the plots that are generated in the frontend. The method `all_plotdata` is called to retrieve (all)
    plotdata. This function can take some filters on the dataset (see below).

    Each plot is returned as a dict with the relevant data, which can be used as input for primeNG charts or
    charts.js in the frontend. The dict for each plot includes data labels (x-values) and datasets (y-values
    and colours).
    """
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

        #source/adaptation
        if 'work_is_source' in filters:
            if not work.is_source in filters['work_is_source']:
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
        counts = Counter(work.medium if work.medium in STANDARD_MEDIA else 'other' for work in works )
        all_labels = STANDARD_MEDIA + ['other']

        labels = [label for label in all_labels if label in counts]
        colours = [DEFAULT_PALETTE[i] for (i, label) in enumerate(all_labels) if label in counts]

        data = {
            'labels': labels,
            'datasets': [{
                'data': [counts[medium] for medium in labels],
                'backgroundColor': colours,
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
        step = max(1, int((this_year - min_year) / 10))
        rangesize = this_year - min_year
        start_year = this_year - rangesize -  2*step  + (rangesize % step)
        labels = list(range(start_year, this_year - step + 1, step))

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
        all_labels = STANDARD_ENVIRONMENTS + ['other']

        labels = [label for label in all_labels if label in counts]
        colours = [DEFAULT_PALETTE[i] for (i, label) in enumerate(all_labels) if label in counts]

        data = {
            'labels': labels,
            'datasets': [{
                'data': [counts[label] for label in labels],
                'backgroundColor': colours,
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
        labels = ['high', 'low', 'other', 'none', 'unknown']

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

    def hobbies_plotdata(works, heroes, responses):
        labels, counts = Plots._top_10_counts_with_other(hobby for hero in heroes for hobby in hero.hobbies)

        data = {
            'labels': labels,
            'datasets': [{
                'data': [counts[label] for label in labels],
                'backgroundColor': DEFAULT_PALETTE[:len(labels)],
            }]
        }

        return data

    def pets_plotdata(works, heroes, responses):
        labels, counts = Plots._top_10_counts_with_other(pet for hero in heroes for pet in hero.pets if pet != 'None')

        data = {
            'labels': labels,
            'datasets': [{
                'data': [counts[label] for label in labels],
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
        counts = Counter(hero.get_profession_display() for hero in heroes)
        all_labels = [
            'Architecture and engineering',
            'Arts, culture, and entertainment',
            'Business, management, and administration',
            'Communications',
            'Community and social services',
            'Education',
            'Farming, fishing, and forestry',
            'Government',
            'Health and medicine',
            'Installation, repair, and maintenance',
            'Law and public policy',
            'Sales',
            'Science and technology',
            'Other',
            'None',
            ]

        palette = DEFAULT_PALETTE[:-1] + ['#8dd3c7', '#e5c494', '#e78ac3', '#80b1d3'] + DEFAULT_PALETTE[-1:]
        labels = [label for label in all_labels if label in counts]
        colours = [palette[i] for (i, label) in enumerate(all_labels) if label in counts]

        data = {
            'labels': labels,
            'datasets': [{
                'data': [counts[label] for label in labels],
                'backgroundColor': colours,
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

    def sex_plotdata(works, heroes, responses):
        nice_strings = {
            False: 'no',
            True: 'yes',
        }

        counts = Counter(nice_strings[hero.sex] for hero in heroes)
        labels = ['yes', 'no']

        data = {
            'labels': labels,
            'datasets': [{
                'data': [counts[label] for label in labels],
                'backgroundColor': YESNO_PALETTE[:len(labels)],
            }]
        }

        return data


    def relatives_plotdata(works, heroes, responses):
        nice_strings = {
            'PARENTS_PRESENT': 'parents (present)',
            'PARENTS_ABSENT': 'parents (absent)',
            'SIBLINGS_PRESENT': 'siblings (present)',
            'SIBLINGS_ABSENT': 'siblings (absent)',
            'NONE': 'none',
            'UNKNOWN': 'unknown',
            }

        labels, counts = Plots._top_10_counts_with_other(
            nice_strings[relative] for hero in heroes for relative in hero.relatives)

        data = {
            'labels': labels,
            'datasets': [{
                'data': [counts[label] for label in labels],
                'backgroundColor': DEFAULT_PALETTE[:len(labels)],
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

    def problems_plotdata(works, heroes, responses):
        labels, counts = Plots._top_10_counts_with_other(problem for hero in heroes for problem in hero.problems)

        data = {
            'labels': labels,
            'datasets': [{
                'data': [counts[label] for label in labels],
                'backgroundColor': DEFAULT_PALETTE[:len(labels)],
            }]
        }

        return data

    def solutions_plotdata(works, heroes, responses):
        labels, counts = Plots._top_10_counts_with_other(solution for hero in heroes for solution in hero.solutions)

        data = {
            'labels': labels,
            'datasets': [{
                'data': [counts[label] for label in labels],
                'backgroundColor': DEFAULT_PALETTE[:len(labels)],
            }]
        }

        return data

    def response_gender_plotdata(works, heroes, responses):
        gender_counts = Counter(response.responses.get('participant_gender', 'Not specified').lower() for response in responses)
        labels = ['male', 'female', 'other', 'not specified']

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
        """
        Returns data for all plots.

        Parameters:
        filters (dict): optional specification of filters to be applied to the data. An example of the format is
            `{ 'hero_gender' : ['Male', 'Other'], ... }`
        This will select on the `gender` property of heroes, so that only 'male' and 'other' heroes are
        included. A filter for a hero property will also affect works and responses, who, in this example,
        would need to be linked to a hero of the selected genders.
        Currently implemented filters are 'hero_gender', 'work_medium' and 'work_is_source'.

        Returns:
        A dict. Includes the keys 'n_works', 'n_heroes', and 'n_responses', which state
        how many works/heroes/responses match the filters. If there are any, the dict will
        also have a key for each plot. The value is also a dict, specifying the dataset. This specifies
        data labels (x-values) and datasets (y-values and colours).
        """
        works = Plots._all_works(filters)
        heroes = Plots._all_heroes(filters)
        responses = Plots._all_responses(filters)

        # skip plots if there are no responses
        if len(responses) == 0:
            all_data = { 'n_works': len(works), 'n_heroes': len(heroes), 'n_responses': len(responses) }
            return all_data

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
            'hero_sex': Plots.sex_plotdata,
            'hero_relatives': Plots.relatives_plotdata,
            'hero_hobbies': Plots.hobbies_plotdata,
            'hero_pets': Plots.pets_plotdata,
            'hero_problems': Plots.problems_plotdata,
            'hero_solutions': Plots.solutions_plotdata,
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
