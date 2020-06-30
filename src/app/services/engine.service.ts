import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Engine } from '../models/Engine';
import { URL } from '../config';

@Injectable({ providedIn: 'root' })
export class EngineService {

    constructor(private http: HttpClient, private url: URL) {
    }

    getAll() {
        return this.http.get<Engine[]>(this.url.url + 'engines/getAll');
    }

}
