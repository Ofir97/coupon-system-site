import { Category } from "./Category";

export class CouponPayload {
    public constructor(
        public id?: number,
        public title?: string,
        public category?: Category,
        public description?: string,
        public startDate?: Date,
        public endDate?: Date,
        public amount?: number,
        public price?: number,
        public image?: FileList
    ) {}
}