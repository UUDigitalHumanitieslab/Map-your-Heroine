import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'mh-vis-hero',
  templateUrl: './vis-hero.component.html',
  styleUrls: ['./vis-hero.component.scss']
})
export class VisHeroComponent implements OnInit, OnChanges {
  @Input() plotData: any;

  plotNames = [
      'hero_gender', 'hero_age', 'hero_role', 'hero_narrator', 'hero_focaliser',
      'hero_education', 'hero_wealth', 'hero_profession',
      'hero_country_origin', 'hero_country_growup', 'hero_country_live',
      'hero_attractive', 'hero_sex', 'hero_relatives',
      'hero_hobbies', 'hero_pets', 'hero_problems', 'hero_solutions',
    ];
  plots = {
        hero_gender: {
          title: 'Gender of the hero(ine)',
          data: undefined
        },
        hero_age: {
            title: 'Age of the hero(ine)',
            data: undefined
        },
        hero_role: {
            title: 'What is the role of the hero(ine)?',
            data: undefined,
        },
        hero_narrator: {
            title: 'Is the hero(ine) the narrator?',
            data: undefined
        },
        hero_focaliser: {
            title: 'Is the hero(ine) the focaliser?',
            data: undefined
        },
        hero_education: {
            title: 'Education',
            data: undefined
        },
        hero_wealth: {
            title: 'Wealth',
            data: undefined
        },
        hero_profession: {
            title: 'Profession',
            data: undefined
        },
        hero_hobbies: {
            title: 'Hobbies',
            data: undefined,
        },
        hero_pets: {
            title: 'Pets',
            data: undefined,
        },
        hero_attractive: {
            title: 'Is the hero(ine) considered attractive?',
            data: undefined,
        },
        hero_sex: {
            title: 'Are the hero(ine)\'s sexual relations described?',
            data: undefined,
        },
        hero_relatives: {
            title: 'Relatives',
            data: undefined,
        },
        hero_country_origin: {
            title: 'Where was the hero(ine) born?',
            data: undefined
        },
        hero_country_growup: {
            title: 'Where did the hero(ine) grow up?',
            data: undefined
        },
        hero_country_live: {
            title: 'Where does the hero(ine) live?',
            data: undefined
        },
        hero_problems: {
            title: 'What kind of problems does the hero(ine) encounter?',
            data: undefined,
        },
        hero_solutions: {
            title: 'How does the hero(ine) overcome problems?',
            data: undefined,
        },
  };

  numberOfHeroes: number;

  agePlotOptions = {
    legend: {
      display: false
    },
    yAxes: [{
      ticks: {min: 0}
      }]
  };

  smallPlotOptions = {
    aspectRatio: 1.5
  };

  countryPlotOptions = {
    aspectRatio: 1
  };

  widePlotOptions = {
    aspectRatio: 3
  };

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
      this.numberOfHeroes = this.plotData.n_heroes;
      this.plotNames.forEach( name => {
          this.plots[name].data = this.plotData[name];
      });
  }

}
