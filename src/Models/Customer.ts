import { Coupon } from "./Coupon";

export class Customer {

    private _id?: number;
    private _firstName?: string;
    private _lastName?: string;
    private _email?: string;
    private _password?: string;
    private _coupons?: Coupon[] = [];

    public get id() {
        return this._id;
    }

    public set id(id: number) {
        this._id = id;
    }

    public get firstName() {
        return this._firstName;
    }

    public set firstName(firstName: string) {
        this._firstName = firstName;
    }

    public get lastName() {
        return this._lastName;
    }

    public set lastName(lastName: string) {
        this._lastName = lastName;
    }

    public get email() {
        return this._email;
    }

    public set email(email: string) {
        this._email = email;
    }

    public get password() {
        return this._password;
    }

    public set password(password: string) {
        this._password = password;
    }

    public get coupons() {
        return this._coupons;
    }

    public set coupons(coupons: Coupon[]) {
        this._coupons = coupons;
    }    
}

