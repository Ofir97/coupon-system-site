import { ClientType } from "../ClientType";

export class UserModel {
    public constructor(public token?: String,
                       public name?: String,
                       public clientType?: ClientType,
                       public tokenExpirationTime?: Date)
    {}
}   