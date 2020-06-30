import { Component, OnInit } from '@angular/core';
import { Order } from '../models/Order';
import { MatTableDataSource } from '@angular/material';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-users-orders',
  templateUrl: './users-orders.component.html',
  styleUrls: ['./users-orders.component.css']
})
export class UsersOrdersComponent implements OnInit {

  orders: Order[];
  displayedColumns: string[] = ['id', 'user.username', 'engine.engine', 'tire.producent',
  'color.color', 'details.detail', 'price', 'archivized', 'generate', 'archivize'];

  dataSource: MatTableDataSource<Order>;
  constructor(
              public ordersService: OrderService) {
                ordersService.getAll().subscribe(data => {
                  this.orders = data;
                  this.dataSource = new MatTableDataSource(this.orders);
                });
               }

  ngOnInit() {
  }

  generatePdf(orderId: number, username: string) {
    this.ordersService.generatePdfForWorker(orderId, username).subscribe(x => {
      const newBlob = new Blob([x], { type: 'application/pdf' });

      // IE doesn't allow using a blob object directly as link href
      // instead it is necessary to use msSaveOrOpenBlob
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveOrOpenBlob(newBlob);
          return;
      }
      const data = window.URL.createObjectURL(newBlob);
      const link = document.createElement('a');
      link.href = data;
      link.download = 'order.pdf';
      link.dispatchEvent(new MouseEvent('click', {bubbles: true, cancelable: true, view: window}));

      setTimeout(() => {
        window.URL.revokeObjectURL(data);
        link.remove();
      }, 100);
  });
  }

  archivize(orderId: number) {
    this.ordersService.archivize(orderId).subscribe(() => {
      location.reload();
    });
  }
}
