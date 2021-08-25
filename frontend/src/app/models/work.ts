export interface Work {
    title: string;
    medium: 'novel' | 'film' | 'tv-series' | 'vlog' | 'comic' | 'fan fiction' | 'music' | 'ballet' | 'game' | 'other';
    author: string;
    pub_year: number;
    pub_country: string;
    is_source: boolean;
    adaptation_of?: number;
    environment: 'countryside' | 'village' | 'city' | 'extra-terrestrial' | 'unknown';

}

export const MEDIUM_OPTIONS = ['novel', 'film', 'tv-series', 'vlog', 'comic', 'fan fiction', 'music', 'ballet', 'game', 'other (please specify)'];
export const ENVIRONMENT_OPTIONS = ['countryside', 'village', 'city', 'extra-terrestrial', 'unknown'];
