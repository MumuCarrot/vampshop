import { Component } from "@angular/core";
import { HeaderComponent } from "../header/header.component";

import { Currency, Language } from "../enums";

@Component({
    selector: "vamp-content",
    standalone: true,
    imports: [HeaderComponent],
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