from typing import Counter
from math import pi
from bokeh.models import filters
from bokeh.plotting import figure
from factual.models import Hero, Work
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
        if filters != None:
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
            return Plots._work_qualifies(hero.work, work_keys)

        return True

    def _all_heroes(filters = dict()):
        if filters != None:
            heroes = Hero.objects.all()            
            filtered_heroes = [hero for hero in heroes if Plots._hero_qualifies(hero, filters)]
            return filtered_heroes
        else:
            return Hero.objects.all()

    def _pie_plot(counts, name, unit='', palette = DEFAULT_PALETTE):
        data = pd.Series(counts).reset_index(name='value').rename(columns={'index':name}).sort_values(by=name)
        data['angle'] = data['value']/data['value'].sum() * 2*pi

        data['color'] = palette[:len(counts)]

        p = figure(plot_height=400, toolbar_location=None,
                tools="hover", tooltips="@{}: @value {}".format(name, unit), x_range=(-0.5, 1.0))

        p.wedge(x=0, y=1, radius=0.4,
                start_angle=cumsum('angle', include_zero=True), end_angle=cumsum('angle'),
                line_color="white", fill_color='color', legend_field=name, source=data)

        p.axis.axis_label=None
        p.axis.visible=False
        p.grid.grid_line_color = None

        return p

    def _bar_plot(categories, counts, name='', unit=''):
        data = pd.DataFrame(data= {name:categories, 'value':counts})

        p = figure(x_range=categories, plot_height=400,
           toolbar_location=None, tools="hover", tooltips="@{}: @value {}".format(name, unit),)

        p.vbar(x=name, top='value', width=0.9, source=data, color = DEFAULT_PALETTE[0], fill_color = DEFAULT_PALETTE[0])

        p.xgrid.grid_line_color = None
        p.y_range.start = 0

        return p

    def medium_plot(filters=dict()):
        works = Plots._all_works(filters)
        medium_counts = Counter(work.medium if work.medium in STANDARD_MEDIA else 'other' for work in works )

        p = Plots._pie_plot(medium_counts, 'medium', unit='work(s)')
        p.plot_width = 400

        return p

    def pubcountry_plot(filters=dict()):
        works = Plots._all_works(filters)
        counts_all = Counter(work.pub_country for work in works)
        top10 = {country : count for (country, count) in counts_all.most_common(10)}
        other_count = sum(counts_all[country] for country in counts_all if country not in top10)
        if other_count:
            data = {**top10, 'other' : other_count}
        else:
            data = top10

        p = Plots._pie_plot(data, 'country', unit='work(s)')
        p.plot_width = 400

        return p

    def gender_plot(filters=dict()):
        nice_strings = {
            'MALE': 'Male',
            'FEMALE': 'Female',
            'OTHER': 'Other'
        }

        palette = [DEFAULT_PALETTE[10], DEFAULT_PALETTE[2], DEFAULT_PALETTE[0]]

        heroes = Plots._all_heroes(filters)
        gender_counts = Counter(nice_strings[hero.gender] for hero in heroes)

        p = Plots._pie_plot(gender_counts, 'gender', unit='character(s)', palette = palette)
        p.plot_width = 400

        return p

    def role_plot(filters=dict()):
        nice_strings = {
            'MAIN': 'Main character',
            'MINOR': 'Minor character',
            'PROTAGONIST': 'Protagonist'
        }

        heroes = Plots._all_heroes(filters)
        counts = Counter(nice_strings[hero.role] for hero in heroes)

        p = Plots._pie_plot(counts, 'role', unit='character(s)')
        p.plot_width = 350
        p.plot_height = 300

        return p

    def narrator_plot(filters=dict()):
        nice_strings = {
            False: 'No',
            True: 'Yes'
        }

        palette = [DEFAULT_PALETTE[1], DEFAULT_PALETTE[0]]

        heroes = Plots._all_heroes(filters)
        counts = Counter(nice_strings[hero.narrator] for hero in heroes)

        p = Plots._pie_plot(counts, 'narrator', unit='character(s)', palette = palette)
        p.plot_width = 350
        p.plot_height = 300

        return p

    def focaliser_plot(filters=dict()):
        nice_strings = {
            False: 'No',
            True: 'Yes'
        }

        palette = [DEFAULT_PALETTE[1], DEFAULT_PALETTE[0]]

        heroes = Plots._all_heroes(filters)
        counts = Counter(nice_strings[hero.focaliser] for hero in heroes)

        p = Plots._pie_plot(counts, 'focaliser', unit='character(s)', palette = palette)
        p.plot_width = 350
        p.plot_height = 300

        return p
    
    def age_plot(filters=dict()):
        heroes = Plots._all_heroes(filters)
        age_counts = Counter(hero.age for hero in heroes if hero.age != 'UNKNOWN')
        ages = ['0-25', '26-35', '36-45', '46-55', '56-65', '65+']
        age_values = [age_counts[age] for age in ages]

        p = Plots._bar_plot(ages, age_values, name='age', unit='character(s)')
        p.plot_width = 400

        return p