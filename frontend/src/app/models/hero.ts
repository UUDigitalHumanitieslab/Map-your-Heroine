export interface IHero {
    id?: number; // id exists only when retrieving from backend, so make it optional
    name: string;
    work: any;

    //role: 'protagonist' | 'main character' | 'minor character'
    role: string;
    narrator: boolean;
    focaliser: boolean;

    // age: '0-25' | '26-35' | '46-55' | '56-65' | '65+'
    age?: string;
    //gender: 'Male' | 'Female' | 'Other'
    gender: string;
    country_origin: string;
    country_live: string;
    country_growup: string;
    // education: 'high (university, university of applied sciences)' | 'low (primary or secondary school, vocational training)'
    education: string;
    profession: string;
    hobbies: string[];
    pets: string[];
    appearance?: boolean;
    sex: boolean;
    //relatives: 
    relatives: string[];
    wealth?: string;
    problems: string[];
    // solutions: 
    solutions: string[];
}

export const YESNOUNK_OPTIONS = [{label: 'Yes', value: true}, {label: 'No', value: 'False'}, {label: 'Unknown', value: null}]
export const YESNO_OPTIONS = [{label: 'Yes', value: true}, {label: 'No', value: 'False'}]
export const ROLE_OPTIONS = [{ label: 'Protagonist', value: 'protagonist' }, { label: 'Main character', value: 'main' }, { label: 'Minor character', value: 'minor' }];
export const EDUCATION_OPTIONS = [
    {label: 'High (university, university of applied sciences)', value: 'high' }, 
    {label: 'Low (primary or secondary school, vocational training)', value: 'low' },
    {label: 'Unknown', value: 'unknown'}];
export const PETS_OPTIONS = ['Dog', 'Cat', 'Horse', 'Fish', 'Bird', 'Rodent']
export const AGE_OPTIONS = ['0-25', '26-35', '36-45', '46-55', '56-65', '65+', 'Unknown'];
export const GENDER_OPTIONS = ['Male', 'Female', 'Other'];
export const RELATIVES_OPTIONS = [
    {label: 'Parents(s) alive and present', value: 'parents present'}, 
    {label: 'Parents(s) alive but not present', value: 'parents absent'}, 
    {label: 'Sibling(s) alive and present', value: 'siblings present'}, 
    {label: 'Sibling(s) alive but not present', value: 'siblings absent'}, 
    {label: 'Unknown', value: 'unknown'}]
export const WEALTH_OPTIONS = ['Rich', 'In between', 'Poor', 'Unknown'];
export const PROBLEM_OPTIONS = ['Financial', 'Psychological', 'Physical', 'Social', 'Ethnic', 'Sexual'];
export const SOLUTION_OPTIONS = ['Education', 'Work', 'Crime', 'Friends', 'Marriage', 'Reflection', 'Religion'];
