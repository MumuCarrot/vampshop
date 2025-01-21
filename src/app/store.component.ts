import { Component, Input, OnInit } from "@angular/core";
import { RouterLink } from "@angular/router";
import { Item } from "./item";
import { HttpService } from "./http.service";

@Component({
    selector: "store-comp",
    standalone: true,
    imports: [RouterLink],
    templateUrl: "store.component.html",
    styleUrl: "store.component.css"
})
export class StoreComponent implements OnInit {
    @Input() storeData!: Item[];

    constructor(private httpService: HttpService) {}

    currencyList: object[] = [];

    getPrice(price, curr: string) : number | null {
        let currency = this.currencyList.find(item => Object.keys(item)[0] === curr);
        return currency ? Number((price * currency[curr]).toFixed(2)) : null;
    }

    ngOnInit() {
        this.httpService.getData("./currency.json").
            subscribe({
                next: (data:any) => {
                    this.currencyList = data["currency"];
                }
            });
    }
}