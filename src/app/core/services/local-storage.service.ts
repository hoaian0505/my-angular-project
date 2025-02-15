import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {
    set(key: string, value: any):void{
        localStorage.setItem(key,value);
    }
    get(key: string){
        return localStorage.getItem(key);
    }
    remove(key: string): void {
        localStorage.removeItem(key);
    }
}