import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class BackendService {
    private apiUrl = environment.apiUrl || '/api/';

    constructor(private http: HttpClient) { }

    /**
    * Collect JSON from an specific url.
    * @param objectUrl The part of the URL after the backendUrl from config.json.
    * (i.e. whatever comes after, for example, '/api/').
    * Note that this method will add a '/' at the end of the url if it does not exist.
    */
    get<T>(objectUrl: string): Observable<T> {
        const url = this.joinURL(this.apiUrl, objectUrl);
        return this.http.get<T>(url).pipe(
            catchError(err => this.handleError(err)),
        );
    }

    post(objectUrl: string, body: any): Observable<any> {
        const url = this.joinURL(this.apiUrl, objectUrl);
        return this.http.post(url, body).pipe(
            catchError(err => this.handleError(err)),
        );
    }

    private joinURL(baseUrl: string, objectUrl: string): string {
        if (!objectUrl.endsWith('/')) { objectUrl = `${objectUrl}/`; }
        return encodeURI(baseUrl + objectUrl);
    }

    private handleError(error: any): Observable<any> {
        console.error('An error occurred', error);
        return from(Promise.reject(error.message || error));
    }
}
