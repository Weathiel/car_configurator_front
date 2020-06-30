import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tire } from '../models/Tire';
import { URL } from '../config';

@Injectable({ providedIn: 'root' })
export class TireService {
    constructor(private http: HttpClient, private url: URL) {
    }

    getAll() {
        return this.http.get<Tire[]>(this.url.url + 'tires/getAll');
    }

}
