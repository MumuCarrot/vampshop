import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { CommonModule } from "@angular/common";

import { HeaderComponent } from "./header.component";
import { HttpService} from "./http.service";
import { CartService } from "./cart.service";
import { SignService } from "./sign.service";

@Component({
    selector: "vamp-content",
    standalone: true,
    imports: [RouterOutlet, CommonModule, HeaderComponent],
    templateUrl: "./app.component.html",
    styleUrl: "./app.component.css",
    providers: [HttpService, CartService, SignService]
})
export class AppComponent {
    constructor(public sign: SignService) {}

    onPopupClick(event: Event): void {
        event.stopPropagation();
    }
}