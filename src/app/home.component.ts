import { Component } from "@angular/core";
import { StoreComponent } from "./store.component";

@Component({
    selector: "home-comp",
    standalone: true,
    imports: [StoreComponent],
    templateUrl: "./home.component.html",
    styleUrl: "./home.component.css"
})
export class HomeComponent {}