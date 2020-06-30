import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Details } from '../models/Details';
import { URL } from '../config';

@Injectable({ providedIn: 'root' })
export class DetailsService {
    constructor(private http: HttpClient, private url: URL) {
    }

    getAll() {
        return this.http.get<Details[]>(this.url.url + 'details/getAll');
    }

}
