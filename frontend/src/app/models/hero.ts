export interface IHero {
    id?: number; // id exists only when retrieving from backend, so make it optional
    name: string;
    work: any;

    //role: 'protagonist' | 'main character' | 'minor character'
    role: number;
    country_origin: string;
    country_live: string;
    country_growup: string;

    // education: 'high (university, university of applied sciences)' | 'low (primary or secondary school, vocational training)'
    education: string;
    profession: string;
}

export const ROLE_OPTIONS = [{ label: 'protagonist', value: 'protagonist' }, { label: 'main character', value: 'main' }, { label: 'minor character', value: 'minor' }];
export const EDUCATION_OPTIONS = [{ label: 'high (university, university of applied sciences)', value: 'high' }, { label: 'low (primary or secondary school, vocational training)', value: 'low' }];
