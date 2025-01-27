import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SignService } from "./sign.service";

@Component({
    selector: "sign-comp",
    standalone: true,
    imports: [CommonModule],
    templateUrl: "./sign.component.html",
    styleUrl: "./sign.component.css"
})
export class SignComponent {
    constructor(public sign: SignService) {}

    onPopupClick(event: Event): void {
        event.stopPropagation();
    }
}