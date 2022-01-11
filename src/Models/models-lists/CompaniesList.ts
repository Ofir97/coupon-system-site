import { Company } from "../Company";

export class CompaniesListModel {
    private _companies: Company[];

    public get companies() {
        return this._companies;
    }

    public set id(companies: Company[]) {
        this._companies = companies;
    }

}