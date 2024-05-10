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
        this.stockSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
        this.stock = this.stockSubject.asObservable();
    }

    public get stockValue() {
        return this.stockSubject.value;
    }

    // login(username: string, password: string) {
    //     return this.http.post<Stock>(`${environment.apiUrl}/users/authenticate`, { username, password })
    //         .pipe(map(user => {
    //             // store user details and jwt token in local storage to keep user logged in between page refreshes
    //             localStorage.setItem('user', JSON.stringify(user));
    //             this.stockSubject.next(user);
    //             return user;
    //         }));
    // }

    // logout() {
    //     // remove user from local storage and set current user to null
    //     localStorage.removeItem('user');
    //     this.stockSubject.next(null);
    //     this.router.navigate(['/account/login']);
    // }

    // register(user: User) {
    //     return this.http.post(`${environment.apiUrl}/users/register`, user);
    // }

    getAll() {
        return this.http.get<Stock[]>(`${environment.apiUrl}/stocks`);
    }

    getById(id: string) {
        return this.http.get<Stock>(`${environment.apiUrl}/stocks/${id}`);
    }

    update(id: string, params: any) {
        return this.http.put(`${environment.apiUrl}/stocks/${id}`, params)
            .pipe(map(x => {
                // update stored user if the logged in user updated their own record
                if (id == this.stockValue?.id) {
                    // update local storage
                    const stock = { ...this.stockValue, ...params };
                    localStorage.setItem('stock', JSON.stringify(stock));

                    // publish updated user to subscribers
                    this.stockSubject.next(stock);
                }
                return x;
            }));
    }

    delete(id: string) {
        return this.http.delete(`${environment.apiUrl}/stocks/${id}`)
            .pipe(map(x => {
                // auto logout if the logged in user deleted their own record
                if (id == this.stockValue?.id) {
                    this.getAll();
                }
                return x;
            }));
    }
}