export default class Mixin {
    #private;
    baseURL: string;
    constructor(token: string);
    get(endpoint: any, body: any): Promise<any>;
}
