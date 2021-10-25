import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { saveAs } from 'file-saver';

@Component({
  selector: 'mh-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.scss']
})
export class DownloadComponent implements OnInit {
  password: string;
  message: string;

  faDownload = faDownload;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  downloadResults(category: string): void {
    if (!this.password) {
      this.message = 'Please provide a password';
    } else {
      this.message = '';
      const httpParams = new HttpParams().set('password', this.password);
      this.http.get(`/api/download/${category}`, {params: httpParams, observe: 'response', responseType: 'blob' }).subscribe(
        res => {
          const blob = new Blob([res.body], { type: 'text/plain' });
          saveAs(blob, `mapyourheroine_data_${category}.tsv`);
        },
        err => {
          const reason = err.statusText;
          if (reason === 'Incorrect password') {
            this.message = 'Password is incorrect.';
          }
        }
      );
    }
  }

}
