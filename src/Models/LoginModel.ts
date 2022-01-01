import { ClientType } from "./ClientType";

export class LoginModel {
    public constructor(public email?: string,
                       public password?: number,
                       public clientType?: ClientType)
    { }
}