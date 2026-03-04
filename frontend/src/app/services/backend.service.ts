import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';
import { from, Observable, map, switchMap, catchError } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class BackendService {
    private apiUrl: Promise<string> | null = null;

    constructor(private config: ConfigService, private http: HttpClient) { }

    /**
    * Collect JSON from an specific url.
    * @param objectUrl The part of the URL after the backendUrl from config.json.
    * (i.e. whatever comes after, for example, '/api/').
    * Note that this method will add a '/' at the end of the url if it does not exist.
    */
    get<T>(objectUrl: string): Observable<T> {
        return from(this.getApiUrl()).pipe(
            map(baseUrl => this.joinURL(baseUrl, objectUrl)),
            switchMap(url => this.http.get<T>(url)),
            catchError(err => this.handleError(err)),
        )
    }

    post(objectUrl: string, body: any): Observable<any> {
        return from(this.getApiUrl()).pipe(
            map(baseUrl => this.joinURL(baseUrl, objectUrl)),
            switchMap(url => this.http.post(url, body)),
            catchError(err => this.handleError(err)),
        )
    }

    getApiUrl(): Promise<string> {
        if (!this.apiUrl) {
            return this.config.get().then(config => config.backendUrl);
        } else {
            return Promise.resolve(this.apiUrl);
        }
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
