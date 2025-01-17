import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";

@Component({
    selector: "header-comp",
    standalone: true,
    imports: [FormsModule],
    templateUrl: "./header.component.html",
    styleUrl: "./header.component.css"
})
export class HeaderComponent {
    s:string = "";

    searchFor(request: string) {
        alert(`Searching for ${request}`);
    }
}