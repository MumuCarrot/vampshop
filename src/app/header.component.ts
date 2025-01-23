import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
    selector: "header-comp",
    standalone: true,
    imports: [FormsModule, CommonModule],
    templateUrl: "./header.component.html",
    styleUrl: "./header.component.css"
})
export class HeaderComponent {
    @Input() numberCartItems!: number;

    @Output() userWantToSignChanged = new EventEmitter<boolean>();
    setUserWantToSign(bool: boolean) {
        this.userWantToSignChanged.emit(bool);
    }

    s:string = "";
    showLangMenu: boolean = false;
    showUserMenu: boolean = false;
    showCartMenu: boolean = false;

    searchFor(request: string) {
        alert(`Searching for ${request}`);
    }
}