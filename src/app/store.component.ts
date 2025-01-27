import { Component, OnInit } from "@angular/core";
import { RouterLink } from "@angular/router";
import { Item } from "./item";
import { HttpService } from "./http.service";

import { CartService } from "./cart.service";

@Component({
    selector: "store-comp",
    standalone: true,
    imports: [RouterLink],
    templateUrl: "store.component.html",
    styleUrl: "store.component.css"
})
export class StoreComponent implements OnInit {
    storeData!: Item[];

    constructor(private httpService: HttpService, public cart: CartService) {}

    addToCart(event: Event, id: string) {
        event.stopPropagation();
        event.preventDefault();
        this.cart.addItem(id);
    }

    ngOnInit() {
        this.httpService.getData("./data.json", "dataList").
        subscribe({
            next: (data: Item[]) => {
                this.storeData = data;
            }
        });
    }
}