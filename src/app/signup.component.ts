import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from "@angular/router";

import { HttpService } from './http.service';
import { SignService } from './sign.service';
import { UserService } from './user.service';
import { User } from './user';

@Component({
    selector: 'signup-comp',
    standalone: true,
    imports: [FormsModule, RouterModule],
    templateUrl: './signup.component.html',
    styleUrl: './signup.component.css',
    providers: [HttpService]
})
export class SignUpComponent {
    constructor(public sign: SignService, 
                public http: HttpService, 
                public user: UserService,
                public router: Router) {
        user.userData = new User();
    }

    passwordConfiramtion: string = '';
    alert: string[] = [];

    onKeyPress(event: KeyboardEvent): void { 
        if (event.key === "Enter") {
            this.signContinuation();
        }
    }

    loginCheck(login: string): boolean {
        const regex = /^(?=.*[a-zA-Z]{3,})(?=.*\d*)([a-zA-Z\d]{6,})$/;
        return regex.test(login);
    }

    userNameCheck(name: string): boolean {
        const regex = /^[a-zA-Z0-9]{1,}$/;
        return regex.test(name);
    }

    passwordCheck(password: string): boolean {
        const regex = /^[a-zA-Z0-9]{6,}$/;
        return regex.test(password);
    }

    emailCheck(email: string): boolean {
        if (email.length == 0) return true;
        const regex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/;
        return regex.test(email);
    }
    
    phoneCheck(phone: string): boolean {
        if (phone.length == 0) return true;
        const regex = /^\+[0-9]{14}$/;
        return regex.test(phone);
    }

    comparePasswords(password: string, confirmationPassword: string): boolean {
        return password === confirmationPassword;
    }

    signContinuation() {
        this.alert = [];
        if (!this.loginCheck(this.user.userData.login)) this.alert.push('Login must contain at least 3 letters and 6 characters');
        if (!this.userNameCheck(this.user.userData.name)) this.alert.push('Name must contain only letters or numbers');
        if (!this.passwordCheck(this.user.userData.password)) this.alert.push('Password must contain only letters or numbers');
        if (!this.comparePasswords(this.user.userData.password, this.passwordConfiramtion)) this.alert.push('Passwords do not match');
        if (!this.emailCheck(this.user.userData.email)) this.alert.push('Email is not valid');
        if (!this.phoneCheck(this.user.userData.phone)) this.alert.push('Phone is not valid');
        if (this.alert.length > 0) return;

        this.http.addUser(this.user.userData).
            subscribe({
                next: (data: any) => { 
                    this.user.userData = data;
                    this.router.navigate(['/']);
                },
                error: (err: any) => this.alert = err.error?.error || 'Unknown error'
            });
    }
}