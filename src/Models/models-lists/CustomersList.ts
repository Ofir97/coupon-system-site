import { Customer } from "../Customer";

export class CustomersListModel {
    private _customers: Customer[];

    public get customers() {
        return this._customers;
    }

    public set id(customers: Customer[]) {
        this._customers = customers;
    }

}