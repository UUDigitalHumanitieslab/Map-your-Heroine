export interface IHero {
    id?: number; // id exists only when retrieving from backend, so make it optional
    name: string;
    work: any;

    role: string;
    narrator: boolean;
    focaliser: boolean;

    age?: string;
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
    relatives: string[];
    wealth?: string;
    problems: string[];
    solutions: string[];
}

export const YESNOUNK_OPTIONS = [{label: 'Yes', value: true}, {label: 'No', value: false}, {label: 'Unknown', value: null}];
export const YESNO_OPTIONS = [{label: 'Yes', value: true}, {label: 'No', value: false}]
export const ROLE_OPTIONS = [{ label: 'Major character', value: 'MAJOR' }, { label: 'Minor character', value: 'MINOR' }];
export const EDUCATION_OPTIONS = [
    {label: 'High (university, university of applied sciences)', value: 'HIGH' },
    {label: 'Low (primary or secondary school, vocational training)', value: 'LOW' },
    {label: 'Other', value: 'OTHER' },
    {label: 'None', value: 'NONE' },
    {label: 'Unknown', value: 'UNKNOWN'}];
export const PROFESSION_OPTIONS = [
    {label: 'Architecture and engineering', value: 'ARCHITECTURE' },
    {label: 'Arts, culture, and entertainment', value: 'ARTS' },
    {label: 'Business, management, and administration', value: 'BUSINESS' },
    {label: 'Communications', value: 'COMMUNICATIONS' },
    {label: 'Community and social services', value: 'COMMUNITY' },
    {label: 'Education', value: 'EDUCATION' },
    {label: 'Farming, fishing, and forestry', value: 'FARMING' },
    {label: 'Government', value: 'GOVERNMENT' },
    {label: 'Health and medicine', value: 'HEALTH' },
    {label: 'Installation, repair, and maintenance', value: 'INSTALLATION' },
    {label: 'Law and public policy', value: 'LAW' },
    {label: 'Sales', value: 'SALES' },
    {label: 'Science and technology', value: 'SCIENCE' },
    {label: 'Other', value: 'OTHER' },
    {label: 'This hero has no profession', value: 'NONE' },
    {label: 'Unknown', value: 'UNKNOWN' }];
export const PETS_OPTIONS = ['Dog', 'Cat', 'Horse', 'Fish', 'Bird', 'Rodent'];
export const AGE_OPTIONS = ['0-25', '26-35', '36-45', '46-55', '56-65', '65+', 'Unknown'];
export const GENDER_OPTIONS = [{ label: 'Male', value: 'MALE' }, { label: 'Female', value: 'FEMALE' }, { label: 'Other', value: 'OTHER' }];
export const RELATIVES_OPTIONS = [
    {label: 'Parents(s) alive and present', value: 'PARENTS_PRESENT'},
    {label: 'Parents(s) alive but not present', value: 'PARENTS_ABSENT'},
    {label: 'Sibling(s) alive and present', value: 'SIBLINGS_PRESENT'},
    {label: 'Sibling(s) alive but not present', value: 'SIBLINGS_ABSENT'},
    {label: 'This hero has no relatives', value: 'NONE'},
    {label: 'Unknown', value: 'UNKNOWN'}]
export const WEALTH_OPTIONS = [
    {label: 'Rich', value: 'RICH'}, {label: 'In between', value: 'INBETWEEN'}, {label: 'Poor', value: 'POOR'}, {label: 'Unknown', value: 'UNKNOWN'}];
export const PROBLEM_OPTIONS = ['Financial', 'Psychological', 'Physical', 'Social', 'Ethnic', 'Sexual'];
export const SOLUTION_OPTIONS = ['Education', 'Work', 'Crime', 'Friends', 'Marriage', 'Reflection', 'Religion'];
export const HOBBIES_OPTIONS = [
    'Academic',
    'Arts & crafts',
    'Collecting',
    'Dancing',
    'Food & drinks',
    'Games',
    'Languages',
    'Model & electric',
    'Music',
    'Pets',
    'Reading',
    'Spiritual & mental',
    'Sports & outdoors',
    'Theatre'
];
