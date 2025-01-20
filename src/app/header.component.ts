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
    currencyCB: Currency;
    currencies = Object.values(Currency);
    @Input() language!: Language;
    languageCB: Language;
    languages = Object.values(Language);
    @Input() numberCartItems!: number;
    
    ngOnInit() {
        this.currencyCB = this.currency;
        this.languageCB = this.language;
    }

    @Output() languageCurrencyChanged = new EventEmitter<[Currency, Language]>();

    changeLanguageCurrency() {
        this.currency = this.currencyCB;
        this.language = this.languageCB;
        console.log([this.currency, this.language]);
        this.languageCurrencyChanged.emit([this.currency, this.language]);
    }

    s:string = "";
    showLangMenu: boolean = false;
    showUserMenu: boolean = false;
    showCartMenu: boolean = false;

    searchFor(request: string) {
        alert(`Searching for ${request}`);
    }

    getEnumLanguageKeyByValue(value: Language[keyof Language]): keyof Language | undefined {
        return Object.keys(Language).find(key => (Language as any)[key] === value) as keyof Language | undefined;
    }
}