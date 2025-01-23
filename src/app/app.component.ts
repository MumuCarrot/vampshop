import { Component, Renderer2 } from "@angular/core";
import { RouterOutlet} from "@angular/router";
import { CommonModule } from "@angular/common";

import { HeaderComponent } from "./header.component";
import { HttpService} from "./http.service";

@Component({
    selector: "vamp-content",
    standalone: true,
    imports: [RouterOutlet, CommonModule, HeaderComponent],
    templateUrl: "./app.component.html",
    styleUrl: "./app.component.css",
    providers: [HttpService]
})
export class AppComponent {
    numberCartItems: number = 0;

    userWantToSign: boolean = false;

    constructor(private renderer: Renderer2) {}

    setUserWantToSign(bool: boolean) {
        this.userWantToSign = bool;
        if (this.userWantToSign) {
            this.renderer.setStyle(document.body, 'overflow', 'hidden');
          } else {
            this.renderer.removeStyle(document.body, 'overflow');
          }
    }

    onPopupClick(event: Event): void {
        event.stopPropagation();
    }
}