import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";

import { StoreComponent } from "./store.component";
import { HttpService } from "./http.service";
import { Item } from "./item";

@Component({
    selector: "home-comp",
    standalone: true,
    imports: [StoreComponent, CommonModule, RouterLink],
    templateUrl: "./home.component.html",
    styleUrl: "./home.component.css",
    providers: [HttpService]
})
export class HomeComponent implements OnInit {
    constructor(public http: HttpService) {}

    dayDeal: Item[] | undefined;
    youShouldSee: Item[] | undefined;
    httpDayDealReady: boolean = false;
    httpYouShouldSeeReady: boolean = false;

    ngOnInit() {
        this.http.getDayDeal().
            subscribe({ next: (data: any) => {
                this.dayDeal = data;
                this.httpDayDealReady = true;
            }});
        this.http.getYouShouldSee().
            subscribe({ next: (data: any) => {
                this.youShouldSee = data;
                this.httpYouShouldSeeReady = true;
            }});
    }
}