import { Component, Input, Output, EventEmitter } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Currency, Language } from "../enums";

@Component({
    selector: "header-comp",
    standalone: true,
    imports: [FormsModule, CommonModule],
    templateUrl: "./header.component.html",
    styleUrl: "./header.component.css"
})
export class HeaderComponent {
    @Input() currency!: Currency;
    @Input() language!: Language;
    @Input() numberCartItems!: number;
    
    @Output() languageCurrencyChanged = new EventEmitter<[Currency, Language]>();

    changeLanguageCurrency() {
        this.languageCurrencyChanged.emit([this.currency, this.language]);
    }

    s:string = "";
    showLangMenu: boolean = false;
    showUserMenu: boolean = false;
    showCartMenu: boolean = false;

    searchFor(request: string) {
        alert(`Searching for ${request}`);
    }
}