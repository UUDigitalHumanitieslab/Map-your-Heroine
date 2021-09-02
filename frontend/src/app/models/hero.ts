export interface IHero {
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

export const ROLE_OPTIONS = ['protagonist', 'main character', 'minor character'];
export const EDUCATION_OPTIONS = ['high (university, university of applied sciences)', 'low (primary or secondary school, vocational training)'];
