import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { HttpService} from "./http.service";

import { HeaderComponent } from "./header.component";
import { SignComponent } from "./sign.component";
import { CartService } from "./cart.service";
import { SignService } from "./sign.service";
import { UserService } from "./user.service";

@Component({
    selector: "vamp-content",
    standalone: true,
    imports: [RouterOutlet, HeaderComponent, SignComponent],
    templateUrl: "./app.component.html",
    styleUrl: "./app.component.css",
    providers: [HttpService, CartService, SignService, UserService]
})
export class AppComponent {}