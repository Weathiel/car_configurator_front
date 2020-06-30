import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CurrentUser } from './models/CurrentUser';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { URL } from './config';

// tslint:disable:no-string-literal
// tslint:disable:quotemark
// tslint:disable:object-literal-key-quotes
@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<CurrentUser>;
    public currentUser: Observable<CurrentUser>;

    constructor(private http: HttpClient, private url: URL) {
        this.currentUserSubject = new BehaviorSubject<CurrentUser>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): CurrentUser {
        return this.currentUserSubject.value;
    }

    login(username, password) {
        return this.http.post<any>(this.url.url + `login`, { username, password }, {
            headers: new HttpHeaders().set('Content-Type', 'application/json'),
            responseType: 'json'
        })
            .pipe(
                map(user => {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                    console.log(localStorage.getItem('currentUser'));
                    return user;
                }));
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }

}

