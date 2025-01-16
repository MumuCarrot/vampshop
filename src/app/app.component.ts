import { Component } from "@angular/core";
import { HeaderComponent } from "../header/header.component";

@Component({
    selector: "vamp-content",
    standalone: true,
    imports: [HeaderComponent],
    templateUrl: "./app.component.html",
    styleUrl: "./app.component.css"
})
export class AppComponent {}