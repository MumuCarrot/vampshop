import { Injectable } from "@angular/core";
import { Renderer2 } from "@angular/core";

@Injectable()
export class SignService {

    constructor(private renderer: Renderer2) {}

    private _visible: boolean = false;

    get visible(): boolean {
        return this._visible;
    }

    openSignPopup() {
        this._visible = true;
        this.renderer.setStyle(document.body, 'overflow', 'hidden');
    }

    closeSignPopup() {
        this._visible = false;
        this.renderer.removeStyle(document.body, 'overflow');
    }
}