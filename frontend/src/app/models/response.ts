export interface IResponse {
    id?: number; // id exists only when retrieving from backend, so make it optional
    work: any;
    hero: any;
    responses: any;
}