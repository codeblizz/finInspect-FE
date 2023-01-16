export interface MainRepositoryInterface {
    get(params?: any): Promise<any>;
    post(params?: any): Promise<any>;
    create(payload: any): Promise<any>;
}