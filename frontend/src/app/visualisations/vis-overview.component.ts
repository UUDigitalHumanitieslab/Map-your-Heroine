import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as Bokeh from '@bokeh/bokehjs/build/js/lib/embed';
import { embed_item } from '@bokeh/bokehjs/build/js/lib/embed';

@Component({
  selector: 'mh-vis-overview',
  templateUrl: './vis-overview.component.html',
  styleUrls: ['./vis-overview.component.scss']
})
export class VisOverviewComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('/api/results/exampleplot').subscribe(
      res => {
        Bokeh.embed_item(res, 'exampleplot');
      },
      err => console.error(err)
    );
  }

}
