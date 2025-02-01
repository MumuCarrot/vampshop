import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";

import { CartService } from "./cart.service";
import { SignService } from "./sign.service";
import { UserService } from "./user.service";

@Component({
    selector: "header-comp",
    standalone: true,
    imports: [FormsModule, CommonModule, RouterLink],
    templateUrl: "./header.component.html",
    styleUrl: "./header.component.css"
})
export class HeaderComponent {
    constructor(public cart: CartService, 
                public sign: SignService,
                public user: UserService) {}

    searchQuery:string = "";
    showUserMenu: boolean = false;

    searchFor(request: string) {
        alert(`Searching for ${request}`);
    }
}