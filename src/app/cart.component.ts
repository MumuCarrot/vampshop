import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Observable } from "rxjs";
import { RouterLink } from "@angular/router";

import { StoreComponent } from "./store.component";
import { HttpService } from "./http.service";
import { CartService } from "./cart.service";
import { SignService } from "./sign.service";
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
    constructor(public cart: CartService, public sign: SignService, public http: HttpService) {
        this.cartServiceObservable = this.cart.idList$;    
    }
    
    cartServiceObservable: Observable<string[]>;
    itemsInCart: Item[] = [];
    itemPrice: number = 0;
    shippingCharge: number = 0;
    totalPrice: number = 0;

    ngOnInit(): void {
        this.searchForDataById();
    }

    searchForDataById(): void {
        this.cartServiceObservable.
            subscribe((idList) => {
                this.http.getItemsById("./data.json", "dataList", idList).
                subscribe({
                    next:(data: Item[]) => {
                        this.itemsInCart = data;
                        
                        this.itemPrice = Number((this.itemsInCart.reduce((sum, item) => sum + item.price, 0)).toFixed(2));
                        this.shippingCharge = Number((((this.itemPrice * 5) / 100)).toFixed(2));
                        this.totalPrice = Number((this.itemPrice + this.shippingCharge).toFixed(2))
                        
                        this.masterChecked = true;
                        this.checkboxStates = Array(this.itemsInCart.length).fill(true);
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
    }
    
    onCheckboxChange(index: number) {
        this.checkboxStates[index] = !this.checkboxStates[index];
        let allChecked = this.checkboxStates.every(state => state);
        this.masterChecked = allChecked;
    }

    removeSelected() {
        let cbStateCopy: boolean[] = [...this.checkboxStates];
        let itemIdListCopy: string[] = this.itemsInCart.map(item => item.id.toString());
        for (let i = 0; i < cbStateCopy.length; i++) {
            if (cbStateCopy[i]) {
                this.cart.removeItem(itemIdListCopy[i]);
            }
        }
    }
}