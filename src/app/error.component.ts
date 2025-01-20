import { Component } from "@angular/core";

@Component({
    selector: "error-comp",
    standalone: true,
    imports: [],
    template: `
    <h1>Sorry...</h1>
    <h2>Looks like your vampire<br>in another castle :P</h2>
    <h3>Error 404: Page not found</h3>
    `,
    styles: `   
    :host {
        text-align: center;
        align-content: center;
        color: white;
    }`
})
export class ErrorComponent {}