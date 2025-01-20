import { Component } from "@angular/core";
import { RouterOutlet} from "@angular/router";

import { HeaderComponent } from "./header.component";
import { Currency, Language } from "../enums";

@Component({
    selector: "vamp-content",
    standalone: true,
    imports: [RouterOutlet, HeaderComponent],
    templateUrl: "./app.component.html",
    styleUrl: "./app.component.css"
})
export class AppComponent {
    currency: Currency = Currency.USD;
    language: Language = Language.EN;
    numberCartItems: number = 0;

    changeLanguageCurrency(t: [Currency, Language]) {
        this.currency = t[0];
        this.language = t[1];
    }
}