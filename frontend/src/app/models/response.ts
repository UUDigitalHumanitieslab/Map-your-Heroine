export interface IResponse {
    id?: number; // id exists only when retrieving from backend, so make it optional
    work: number;
    hero: number;
    responses: any;
}
