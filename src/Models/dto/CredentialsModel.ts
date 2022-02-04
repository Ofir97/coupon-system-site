import { ClientType } from "../ClientType";

export class CredentialsModel {
    public constructor(public email?: string,
                       public password?: number,
                       public clientType?: ClientType)
    {}
}