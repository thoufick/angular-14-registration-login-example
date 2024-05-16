import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { Stock } from '@app/_models/stock';

@Injectable({ providedIn: 'root' })
export class StockService {
    private stockSubject: BehaviorSubject<Stock | null>;
    public stock: Observable<Stock | null>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.stockSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('Stock')!));
        this.stock = this.stockSubject.asObservable();
    }

    public get stockValue() {
        return this.stockSubject.value;
    }

    // login(Stockname: string, password: string) {
    //     return this.http.post<Stock>(`${environment.apiUrl}/Stocks/authenticate`, { Stockname, password })
    //         .pipe(map(Stock => {
    //             // store Stock details and jwt token in local storage to keep Stock logged in between page refreshes
    //             localStorage.setItem('Stock', JSON.stringify(Stock));
    //             this.stockSubject.next(Stock);
    //             return Stock;
    //         }));
    // }

    // logout() {
    //     // remove Stock from local storage and set current Stock to null
    //     localStorage.removeItem('Stock');
    //     this.stockSubject.next(null);
    //     this.router.navigate(['/account/login']);
    // }

    // register(Stock: Stock) {
    //     return this.http.post(`${environment.apiUrl}/Stocks/register`, Stock);
    // }

     buyStock(stock: Stock) {
         return this.http.post(`${environment.apiUrl}/stocks/buyStock`, stock);
     }

    getAll() {
        return this.http.get<Stock[]>(`${environment.apiUrl}/stocks`);
    }

    getById(id: string) {
        return this.http.get<Stock>(`${environment.apiUrl}/stocks/${id}`);
    }

    update(id: string, params: any) {
        return this.http.put(`${environment.apiUrl}/stocks/${id}`, params)
            .pipe(map(x => {
                // update stored Stock if the logged in Stock updated their own record
                if (id == this.stockValue?.id) {
                    // update local storage
                    const stock = { ...this.stockValue, ...params };
                    localStorage.setItem('stock', JSON.stringify(stock));

                    // publish updated Stock to subscribers
                    this.stockSubject.next(stock);
                }
                return x;
            }));
    }

    delete(id: string) {
        return this.http.delete(`${environment.apiUrl}/stocks/${id}`)
            .pipe(map(x => {
                // auto logout if the logged in Stock deleted their own record
                if (id == this.stockValue?.id) {
                    this.getAll();
                }
                return x;
            }));
    }
}