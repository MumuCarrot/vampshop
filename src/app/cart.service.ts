import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class CartService {
    private idList: string[] = [];

    private idListSubject = new BehaviorSubject<string[]>(this.idList);
    idList$ = this.idListSubject.asObservable();

    get cartLength(): number {
        return this.idList.length;
    };
    get isCartEmpty(): boolean {
        return this.idList.length == 0;
    }

    get cartIdList() {
        return this.idList;
    }

    addItem(item: string) {
        this.idList.push(item);
        this.idListSubject.next([...this.idList]);
    }

    removeItem(item: string) {
        this.idList.splice(this.idList.indexOf(item), 1);
        this.idListSubject.next([...this.idList]);
    }

    clearCart() {
        this.idList = [];
        this.idListSubject.next([...this.idList]);
    }
}