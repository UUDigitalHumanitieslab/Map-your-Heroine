from typing import Counter
from math import pi
from bokeh.plotting import figure
from factual.models import Hero, Work
from bokeh.transform import cumsum
from bokeh.palettes import Set2
import pandas as pd

DEFAULT_PALETTE = Set2[8]

class Plots:
    def _all_works():
        works = Work.objects.all()
        return works

    def _hero_qualifies(hero, filters):
        return hero.gender in filters['hero_gender']

    def _all_heroes(filters = None):
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


    def gender_plot(filters=None):
        print(filters)
        nice_strings = {
            'MALE': 'Male',
            'FEMALE': 'Female',
            'OTHER': 'Other'
        }

        all_heroes = Plots._all_heroes(filters)
        gender_counts = Counter(nice_strings[hero.gender] for hero in all_heroes)

        p = Plots._pie_plot(gender_counts, 'gender', unit='character(s)')
        p.plot_width = 400

        return p

    def role_plot(filters=None):
        nice_strings = {
            'MAIN': 'Main character',
            'MINOR': 'Minor character',
            'PROTAGONIST': 'Protagonist'
        }

        all_heroes = Plots._all_heroes(filters)
        counts = Counter(nice_strings[hero.role] for hero in all_heroes)

        p = Plots._pie_plot(counts, 'role', unit='character(s)')
        p.plot_width = 350
        p.plot_height = 300

        return p

    def narrator_plot(filters=None):
        nice_strings = {
            False: 'No',
            True: 'Yes'
        }

        all_heroes = Plots._all_heroes(filters)
        counts = Counter(nice_strings[hero.narrator] for hero in all_heroes)

        p = Plots._pie_plot(counts, 'narrator', unit='character(s)')
        p.plot_width = 350
        p.plot_height = 300

        return p

    def focaliser_plot(filters=None):
        nice_strings = {
            False: 'No',
            True: 'Yes'
        }

        all_heroes = Plots._all_heroes(filters)
        counts = Counter(nice_strings[hero.focaliser] for hero in all_heroes)

        p = Plots._pie_plot(counts, 'focaliser', unit='character(s)')
        p.plot_width = 350
        p.plot_height = 300

        return p
    
    def age_plot(filters=None):
        all_heroes = Plots._all_heroes(filters)
        age_counts = Counter(hero.age for hero in all_heroes if hero.age != 'UNKNOWN')
        ages = ['0-25', '26-35', '36-45', '46-55', '56-65', '65+']
        age_values = [age_counts[age] for age in ages]

        p = Plots._bar_plot(ages, age_values, name='age', unit='character(s)')
        p.plot_width = 400

        return p