import { Injectable } from "@angular/core";
import { User } from "./user";

@Injectable()
export class UserService {
    constructor() {
        this.loadUser();
    }
    private storageKey = 'user_profile';

    private _user: User | undefined;
    get userData(): User | undefined {
        return this._user;
    }
    set userData(value: User) {
        this._user = value;
        this.saveUser();
    }
    get isUserLoggedIn(): boolean {
        return this._user !== undefined;
    }

    public signOut(): void {
        this._user = undefined;
        this.saveUser("[]");
    }

    private saveUser(stringData: string = JSON.stringify(this._user)): void {
        localStorage.setItem(this.storageKey, stringData);
    }

    private loadUser(): void {
        const data = localStorage.getItem(this.storageKey);
        if (data && data.length > 2) {
            console.log(typeof data + ' ' + data);
            console.log("data len = " + data.length + "\ndata len > 0" + (data.length > 0))
            console.log(typeof JSON.parse(data) + ' ' + JSON.parse(data));
            this._user = JSON.parse(data);
        }
    }
}