import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from "@angular/router";

import { HttpService } from './http.service';
import { SignService } from './sign.service';
import { UserService } from './user.service';

@Component({
    selector: 'signin-comp',
    standalone: true,
    imports: [FormsModule, RouterModule],
    templateUrl: './signin.component.html',
    styleUrl: './uaccmenu.css',
    providers: [HttpService]
})
export class SignInComponent {
    constructor(public sign: SignService, 
                public http: HttpService,
                public user: UserService,
                public router: Router) {
        this.userData = sign.userData;
    }

    userData: string;
    password: string = '';
    alert: string = ' ';

    onKeyPress(event: KeyboardEvent): void { 
        if (event.key === "Enter") {
            this.signContinuation();
        }
    }

    signContinuation() {
        if (this.userData.length > 6 && this.password.length > 6) {
            this.http.getUser(this.userData, this.password).
                subscribe({
                    next: (data: any) => { 
                        this.user.userData = data;
                        this.router.navigate(['/']);
                    },
                    error: (err: any) => this.alert = err.error?.error || 'Unknown error'
                });
        }
    }
}