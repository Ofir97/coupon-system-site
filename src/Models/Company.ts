import { Coupon } from "./Coupon";

export class Company {
    private _id?: number;
    private _name?: string;
    private _email?: string;
    private _password?: string;
    private _coupons?: Coupon[] = [];

    public get id() {
        return this._id;
    }

    public set id(id: number) {
        this._id = id;
    }

    public get name() {
        return this._name;
    }

    public set name(name: string) {
        this._name=name;
    }

    public get email() {
        return this._email;
    }

    public set email(email: string) {
        this._email=email;
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
