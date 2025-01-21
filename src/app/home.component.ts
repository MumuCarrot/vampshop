import { Component, OnInit } from "@angular/core";
import { StoreComponent } from "./store.component";
import { HttpService } from "./http.service";
import { Item } from "./item";

@Component({
    selector: "home-comp",
    standalone: true,
    imports: [StoreComponent],
    templateUrl: "./home.component.html",
    styleUrl: "./home.component.css"
})
export class HomeComponent implements OnInit {

    constructor(private httpService: HttpService) {}

    items: Item[] = [];

    ngOnInit() {
        this.httpService.getData("./data.json").
            subscribe({
                next: (data:any) => {
                    this.items = data["dataList"];
                }
            });
    }
}