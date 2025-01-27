import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { SignService } from "./sign.service";

@Component({
    selector: "sign-comp",
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: "./sign.component.html",
    styleUrl: "./sign.component.css"
})
export class SignComponent {
    constructor(public sign: SignService) {}

    login: string = "";

    onPopupClick(event: Event): void {
        event.stopPropagation();
    }

    signContinuation(): void {
        console.warn("TODO")
    }
}