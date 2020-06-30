import { HttpClient } from '@angular/common/http';
import { User } from '../models/User';
import { URL } from '../config';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient, private url: URL) {
    }

    register(user) {
        return this.http.post<any>(this.url.url + 'register', user);
    }

    getAll() {
        return this.http.get<User[]>(this.url.url + 'users/getAll');
    }

    reCaptchaVerify(captcha: any[]) {
        console.log(captcha);
        return this.http.post<any>(this.url.url + 'reCaptcha', captcha);
    }

    delete(userId: number) {
        return this.http.delete(this.url.url + 'users/admin/delete/' + userId);
    }

    changeToWorker(userId: number) {
        return this.http.get(this.url.url + 'users/changeRole/' + userId);
    }
}
