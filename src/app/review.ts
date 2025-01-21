export class Review {
    constructor(public user: string | undefined, public dateTime : string, public count: number, public type: string, public text: string | undefined) {}
}