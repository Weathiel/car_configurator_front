import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Order } from '../models/Order';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  orders: Order[];
  displayedColumns: string[] = ['id', 'engine.engine', 'tire.producent',
  'color.color', 'details.detail', 'price', 'archivized', 'generate'];

  dataSource: MatTableDataSource<Order>;
  constructor(
              public ordersService: OrderService) {
                ordersService.getMyOrders().subscribe(data => {
                  this.orders = data;
                  this.dataSource = new MatTableDataSource(this.orders);
                });
               }

  ngOnInit() {
  }

  generatePdf(orderId: number) {
    this.ordersService.generatePdf(orderId).subscribe(x => {
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

}
