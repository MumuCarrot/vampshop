import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CommonModule } from "@angular/common";

import { HttpService } from "./http.service";
import { CartService } from "./cart.service";
import { Item } from "./item";
import { StoreComponent } from "./store.component";
import { Review } from "./review";

@Component({
    selector: "product-comp",
    standalone: true,
    imports: [CommonModule, StoreComponent],
    templateUrl: "product.component.html",
    styleUrl: "product.component.css",
    providers: [HttpService]
})
export class ProductComponent implements OnInit {
    
    private id: string;
    item?: Item = null;
    productHaveReview?: boolean = null;
    reviewList: Review[] = [];
    quantity: number = 1;

    constructor(private route: ActivatedRoute,
                private httpService: HttpService,
                private cart: CartService
    ) {}

    changeQuantity(direction: boolean) {
        if (direction) this.quantity++;
        else if (this.quantity > 1) this.quantity--;
    }

    ngOnInit() {
        this.route.queryParamMap.subscribe(() => {
            this.id = this.route.snapshot.paramMap.get('id') ?? '';

            let dataList = "./data.json";
            let dataAttribute = "dataList";
            if (this.id != '')
                this.httpService.getItemById(this.id).
                    subscribe({next: (data: Item) => {
                        this.item = data;
                        this.productHaveReview = typeof this.item.reviews != "undefined" ? true : false;
                        this.reviewList = this.item.reviews ?? [];
                    },
                    error: (err) => {
                        console.error(`Error at: ${dataList} for ${dataAttribute}`, err);
                    }});
        });
    }
}