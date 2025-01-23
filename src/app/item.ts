import { Review } from "./review";

export class Item {
    constructor(public id: number, public price: number, public title: string, public raiting: number, public reviews: Review[] | undefined, public color: string[] | undefined, public size: string[] | undefined, public photo: string[] | undefined) {}
}