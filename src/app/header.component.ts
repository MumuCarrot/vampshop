import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { Router, RouterModule } from "@angular/router";

import { CartService } from "./cart.service";
import { SignService } from "./sign.service";
import { UserService } from "./user.service";

@Component({
    selector: "header-comp",
    standalone: true,
    imports: [FormsModule, CommonModule, RouterLink, RouterModule],
    templateUrl: "./header.component.html",
    styleUrl: "./header.component.css"
})
export class HeaderComponent {
    constructor(public cart: CartService, 
                public sign: SignService,
                public user: UserService,
                public router: Router) {}

    searchQuery:string = "";
    showUserMenu: boolean = false;

    searchFor(request: string) {
        this.router.navigate(["/s/", request]);
    }
}