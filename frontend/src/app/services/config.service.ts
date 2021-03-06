import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Config {
    backendUrl: string;
    voyantUrl: string;
}

@Injectable({
    providedIn: 'root'
})
export class ConfigService {
    private config: Promise<any>;

    constructor(private http: HttpClient) { }

    public get(): Promise<Config> {
        if (!this.config) {
            this.config = new Promise<Config>((resolve, reject) =>
                this.http.get('/assets/config.json').subscribe(response => {
                    resolve(response as Config);
                }));
        }

        return this.config;
    }
}
