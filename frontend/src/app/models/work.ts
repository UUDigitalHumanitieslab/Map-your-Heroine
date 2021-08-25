export interface IWork {
    title: string;
    // medium: 'novel' | 'film' | 'tv-series' | 'vlog' | 'comic' | 'fan fiction' | 'music' | 'ballet' | 'game' | 'other';
    medium: string;
    author: string;
    pub_year: number;
    pub_country: string;
    is_source: boolean;
    adaptation_of?: number;
    // environment: 'countryside' | 'village' | 'city' | 'extra-terrestrial' | 'unknown';
    environment: string;

}

export class Work implements IWork {
    public constructor(
        public title = '',
        public medium = '',
        public author = '',
        public pub_year = 0,
        public pub_country = '',
        public is_source = true,
        public environment = '',
        public is_adaptation_of?,
    ) { }
}

export const MEDIUM_OPTIONS = ['novel', 'film', 'tv-series', 'vlog', 'comic', 'fan fiction', 'music', 'ballet', 'game', 'other (please specify)'];
export const ENVIRONMENT_OPTIONS = ['countryside', 'village', 'city', 'extra-terrestrial', 'unknown'];
