import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import { map, Observable } from "rxjs";
  
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
}