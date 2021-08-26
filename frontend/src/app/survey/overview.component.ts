import { Component, OnInit, ViewChild } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Restangular } from 'ngx-restangular';
import { Dropdown } from 'primeng/dropdown';
import { Subject } from 'rxjs';
import { IWork } from '../models/work';

@Component({
  selector: 'mh-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  faPlus = faPlus;

  works$: Subject<IWork[]>;
  existingWork: IWork;
  displayCreateWork = false;

  heroes: any[];

  constructor(private restangular: Restangular) { }

  ngOnInit() {
    this.fetchWorks();
  }

  fetchWorks() {
    this.works$ = this.restangular.all('works').getList();
  }

  showCreateWork() {
    this.displayCreateWork = true;
  }

  onWorkAdded(work: IWork) {
    // Todo set this in the dropdown
    this.fetchWorks();
    setTimeout(() => this.existingWork = undefined, 0);
    this.displayCreateWork = false;
  }

}
