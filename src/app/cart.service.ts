import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class CartService {
    private idList: [string, number][] = [];

    private idListSubject = new BehaviorSubject<[string, number][]>(this.idList);
    idList$ = this.idListSubject.asObservable();

    get cartLength(): number {
        return this.idList.reduce((sum, [, count]) => sum + count, 0);
    };

    get isCartEmpty(): boolean {
        return this.idList.length == 0;
    }

    get cartIdList() {
        return this.idList;
    }

    set quantityForId(data: [string, number]) {
        const index = this.idList.findIndex(([itemId]) => itemId === data[0]);
        if (index !== -1) {
            this.idList[index][1] = data[1];
        }
    }

    addItem(item: string, quantity: number = 1) {
        const i: [string, number] = [item, quantity];
        const index = this.idList.findIndex(([itemId]) => itemId === item);
        
        if (index !== -1) {
            this.idList[index][1] += quantity;
        }
        else {
            this.idList.push(i);
        }
        
        this.idListSubject.next([...this.idList]);
    }

    removeItem(item: string, quantity: number = 1) {
        const index = this.idList.findIndex(([itemId]) => itemId === item);

        if (index >= 0) {
            this.idList[index][1] -= quantity;
            if (this.idList[index][1] <= 0) {
                this.idList.splice(index, 1);
            }
        }
        
        this.idListSubject.next([...this.idList]);
    }

    clearCart() {
        this.idList = [];
        this.idListSubject.next([...this.idList]);
    }
}