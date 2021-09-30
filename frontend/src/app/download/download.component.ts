import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { saveAs } from 'file-saver';

@Component({
  selector: 'mh-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.scss']
})
export class DownloadComponent implements OnInit {

  faDownload = faDownload;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  downloadResults(category: string): void {
    this.http.get(`/api/download/${category}`, { observe: 'response', responseType: 'blob' }).subscribe(
      res => {
        const blob = new Blob([res.body], { type: 'text/plain' });
        saveAs(blob, `mapyourheroine_data_${category}.tsv`);
      },
      err => console.log(err)
    );
  }

}
