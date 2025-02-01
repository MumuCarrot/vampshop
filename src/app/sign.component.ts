import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Router, RouterModule } from "@angular/router";

import { SignService } from "./sign.service";
import { HttpService } from "./http.service";
import { User } from "./user";

@Component({
    selector: "sign-comp",
    standalone: true,
    imports: [CommonModule, FormsModule, RouterModule],
    templateUrl: "./sign.component.html",
    styleUrl: "./sign.component.css",
    providers: [HttpService]
})
export class SignComponent {
    constructor(public sign: SignService, public http: HttpService, public router: Router) {}

    user: User | undefined;

    login: string = "";

    onPopupClick(event: Event): void {
        event.stopPropagation();
    }

    onKeyPress(event: KeyboardEvent): void { 
        if (event.key === "Enter") {
            this.signContinuation();
        }
    }

    signContinuation(): void {
        if (this.login.length > 6) {
            this.http.doesUserExist(this.login).subscribe((data: any) => {
                this.sign.userData = this.login;
                this.sign.closeSignPopup();
                if(data["exist"]) {
                    this.router.navigate(["/si"]);
                }
                else {
                    this.router.navigate(["/su"]);
                }
            });
        }
    }
}