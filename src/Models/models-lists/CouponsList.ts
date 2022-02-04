import { Coupon } from "../Coupon";

export class CouponsListModel {
    private _coupons: Coupon[];

    public get coupons() {
        return this._coupons;
    }

    public set id(coupons: Coupon[]) {
        this._coupons = coupons;
    }

}