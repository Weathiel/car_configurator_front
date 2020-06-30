import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Color } from '../models/Color';
import { URL } from '../config';

@Injectable({ providedIn: 'root' })
export class ColorService {
    constructor(private http: HttpClient, private url: URL) {
    }

    getAll() {
        return this.http.get<Color[]>(this.url.url + 'colors/getAll');
    }

}
