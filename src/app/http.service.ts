import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "./user";
  
@Injectable()
export class HttpService{
  
    private static readonly HOSTNAME: string = "http://localhost:3000";
    constructor(private http: HttpClient) {}

    getData(): Observable<Object> {
        return this.http.get(`${HttpService.HOSTNAME}/data`);
    }

    getItemById(id: string): Observable<Object> {
        return this.http.get(`${HttpService.HOSTNAME}/data/${id}`);
    }

    getItemsById(idList: string[]): Observable<Object> {
        return this.http.get(`${HttpService.HOSTNAME}/data?ids=${idList.join(',')}`);
    }

    getDayDeal(): Observable<Object> {
        return this.http.get(`${HttpService.HOSTNAME}/daydeal`);
    }

    getYouShouldSee(): Observable<Object> {
        return this.http.get(`${HttpService.HOSTNAME}/youshouldsee`);
    }

    doesUserExist(data: string): Observable<Object> {
        return this.http.get(`${HttpService.HOSTNAME}/user/exist?data=${data}`);
    }

    getUser(data: string, password: string): Observable<Object> {
        return this.http.post(`${HttpService.HOSTNAME}/user/get`, {data, password});
    }

    addUser(user: User): Observable<Object> {
        return this.http.post(`${HttpService.HOSTNAME}/user/create`, {user});
    }

    updateUser(user: User): Observable<Object> {
        return this.http.put(`${HttpService.HOSTNAME}/user/update`, {user});
    }
}