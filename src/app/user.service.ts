import { Injectable } from "@angular/core";
import { User } from "./user";

@Injectable()
export class UserService {
    constructor() {}

    private _user: User | undefined;
    get userData(): User | undefined {
        return this._user;
    }
    set userData(value: User) {
        this._user = value;
    }
    get isUserLoggedIn(): boolean {
        return this._user !== undefined;
    }

    public signOut(): void {
        this._user = undefined;
    }
}