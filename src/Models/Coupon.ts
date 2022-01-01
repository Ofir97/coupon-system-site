import { Category } from "./Category";

export class Coupon {

    private _id?: number;
    private _title?: string;
    private _category?: Category;
    private _description?: string
    private _startDate?: Date;
    private _endDate?: Date;
    private _amount?: number;
    private _price?: number;
    private _image?: any;

    public get id() {
        return this._id;
    }

    public set id(id: number) {
        this._id = id
    }

    public get title() {
        return this._title;
    }

    public set title(title: string) {
        this._title = title;
    }

    public set description(description: string) {
        this._description = description;
    }

    public get description() {
        return this._description;
    }

    public get category() {
        return this._category;
    }

    public set category(category: Category) {
        this._category = category;
    }

    public get startDate() {
        return this._startDate;
    }

    public set startDate(startDate: Date) {
        this._startDate = startDate;
    }

    public get endDate() {
        return this._endDate;
    }

    public set endDate(endDate: Date) {
        this._endDate = endDate;
    }

    public get amount() {
        return this._amount;
    }

    public set amount(amount: number) {
        this._amount = amount
    }

    public get price() {
        return this._price;
    }

    public set price(price: number) {
        this._price = price
    }

    public get image() {
        return this._image;
    }

    public set image(image: any) {
        this._image = image;
    }

}