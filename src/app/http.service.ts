import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import { map, Observable } from "rxjs";
import { Item } from "./item";
  
@Injectable()
export class HttpService{
  
    constructor(private http: HttpClient) {}
      
    getData(dataListName: string, dataParamName: string): Observable<Item[]> {
        return this.http.get(dataListName).pipe(map((data: any) => {
            let dataList = data[dataParamName];
            return dataList.map(function(item: any): Item {
                return new Item(item.id, item.price, item.title, item.raiting, item.reviews, item.color, item.size, item.photo);
            });
        }));
    }

    getItemById(dataListName: string, dataParamName: string, id: string): Observable<Item> {
        return this.http.get<any>(dataListName).pipe(map((data: any) => {
            let dataList = data[dataParamName];
            const item = dataList.find((obj: any) => obj.id === id);
            return item;
        }));
    }

    getItemsById(dataListName: string, dataParamName: string, idList: string[]): Observable<Item[]> {
        return this.http.get<any>(dataListName).pipe(map((data: any) => {
            let dataList = data[dataParamName];
            return dataList.filter((item: any) => idList.includes(item.id));
        }));
    }
}