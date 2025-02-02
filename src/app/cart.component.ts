import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Observable } from "rxjs";
import { RouterLink } from "@angular/router";

import { StoreComponent } from "./store.component";
import { HttpService } from "./http.service";
import { CartService } from "./cart.service";
import { SignService } from "./sign.service";
import { UserService } from "./user.service";
import { Item } from "./item";

@Component({
    selector: "cart-comp",
    standalone: true,
    imports: [CommonModule, StoreComponent, FormsModule, RouterLink],
    templateUrl: "./cart.component.html",
    styleUrl: "./cart.component.css",
    providers: [HttpService]
})
export class CartComponent implements OnInit {
    constructor(public cart: CartService, 
                public sign: SignService, 
                public http: HttpService,
                public user: UserService) {
        this.cartServiceObservable = this.cart.idList$;    
    }
    
    cartServiceObservable: Observable<[string, number][]>;
    itemsInCart: [Item, number][] = [];
    itemPrice: number = 0;
    shippingCharge: number = 0;
    totalPrice: number = 0;

    sumSummary(): void {
        this.itemPrice = Number((this.itemsInCart
            .map(([item, count], index) => this.checkboxStates[index] ? item.price * count : 0)
            .reduce((sum, price) => sum + price, 0)).toFixed(2));
        this.shippingCharge = Number((((this.itemPrice * 5) / 100)).toFixed(2));
        this.totalPrice = Number((this.itemPrice + this.shippingCharge).toFixed(2));
    }

    ngOnInit(): void {
        this.searchForDataById();
    }

    searchForDataById(): void {
        this.cartServiceObservable.
            subscribe((idList) => {
                this.http.getItemsById(idList.map(([str, _]) => str)).
                subscribe({
                    next:(data: Item[]) => {
                        this.itemsInCart = this.cart.cartIdList.map(([id, count]) => {
                            const item = data.find((item) => item.id.toString() === id);

                            if (!item) {
                                throw new Error(`Item with id "${id}" not found in server response.`);
                            }

                            return [item, count];
                        });
                        
                        this.masterChecked = true;
                        this.checkboxStates = Array(this.itemsInCart.length).fill(true);
                        
                        this.sumSummary();
                    },
                    error: () => {
                        console.log("Error with searching data for items in the cart by id.")
                    }});
        });
    }

    lastOperation(): void {
        alert("No logic goes next");
    }

    masterChecked = true;
    checkboxStates: boolean[] = [];
    
    toggleAllCheckboxes() {
        this.checkboxStates = this.checkboxStates.map(() => this.masterChecked);
        this.sumSummary();
    }
    
    onCheckboxChange(index: number) {
        this.checkboxStates[index] = !this.checkboxStates[index];
        let allChecked = this.checkboxStates.every(state => state);
        this.masterChecked = allChecked;
        this.sumSummary();
    }

    removeSelected() {
        let cbStateCopy: boolean[] = [...this.checkboxStates];
        let itemIdListCopy: string[] = this.itemsInCart.map(([item, _]) => item.id.toString());
        for (let i = 0; i < cbStateCopy.length; i++) {
            if (cbStateCopy[i]) {
                this.cart.removeItem(itemIdListCopy[i], 999);
            }
        }
        this.sumSummary();
    }

    changeQuantity(item: [Item, number], direction: boolean) {
        const index = this.itemsInCart.findIndex((a_item) => a_item == item);
        if (index >= 0) {
            if (direction) {
                this.itemsInCart[index][1] += 1;
            }
            else if (this.itemsInCart[index][1] > 1) {
                this.itemsInCart[index][1] -= 1;
            }
            this.cart.quantityForId = [this.itemsInCart[index][0].id.toString(), this.itemsInCart[index][1]];
        }
        this.sumSummary();
    }
}