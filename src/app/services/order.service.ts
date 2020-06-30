import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Order } from '../models/Order';
import { URL } from '../config';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OrderService {

    constructor(private http: HttpClient, private url: URL) {
    }

    getAll() {
        return this.http.get<Order[]>(this.url.url + 'order/getAll');
    }

    create(order) {
        return this.http.post<Order>(this.url.url + 'order/create', order);
    }

    getMyOrders() {
        return this.http.get<Order[]>(this.url.url + 'order/getOrders');
    }

    generatePdf(id: number): Observable<Blob> {
        return this.http.get(this.url.url + 'order/generate/' + id, { responseType: 'blob'});
    }

    getAllOrders() {
        return this.http.get<Order[]>(this.url.url + 'order/getAll');
    }

    generatePdfForWorker(orderId: number, username: string): Observable<Blob> {
        return this.http.get(this.url.url + 'order/worker/generate/' + orderId + '&' + username, { responseType: 'blob'});
    }

    archivize(orderId: number) {
        return this.http.get(this.url.url + 'order/archivize/' + orderId);
    }
}
