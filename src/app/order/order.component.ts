import { Component, OnInit } from '@angular/core';
import { Engine } from '../models/Engine';
import { Details } from '../models/Details';
import { Tire } from '../models/Tire';
import { Color } from '../models/Color';
import { TireService } from '../services/tire.service';
import { EngineService } from '../services/engine.service';
import { OrderService } from '../services/order.service';
import { ColorService } from '../services/color.service';
import { DetailsService } from '../services/details.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Order } from '../models/Order';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  engines: Engine[];
  tires: Tire[];
  colors: Color[];
  details: Details[];
  price = 0;

  form: FormGroup = new FormGroup({
    engine: new FormControl(),
    detail: new FormControl(),
    color: new FormControl(),
    tire: new FormControl(),
    price: new FormControl(),
  });

  constructor(private engineService: EngineService,
              private ordersService: OrderService,
              private tiresService: TireService,
              private colorsService: ColorService,
              private detailsService: DetailsService) {
                engineService.getAll().subscribe(engines => {
                  this.engines = engines;
                });
                colorsService.getAll().subscribe(colors => {
                  this.colors = colors;
                });
                tiresService.getAll().subscribe(tires => {
                  this.tires = tires;
                });
                detailsService.getAll().subscribe(details => {
                  this.details = details;
                });
                this.form.valueChanges.subscribe(order => {
                  console.log('cos');
                  this.getPriceByOrder(order);
                });
               }

  ngOnInit() {
  }

  getPriceByOrder(order) {
    this.price = 0;
    const colorid = this.form.get('color').value;
    const engineid = this.form.get('engine').value;
    const tireid = this.form.get('tire').value;
    const detailid = this.form.get('detail').value;
    if (engineid != null) {
      this.price += this.engines.find(engine => {
        return engine.id === engineid;
      }).price;
    }
    if (tireid != null) {
      this.price += this.tires.find(tire => {
        return tire.id === tireid;
      }).price;
    }
    if (colorid != null) {
      this.price += this.colors.find(color => {
        return color.id === colorid;
      }).price;
    }
    if (detailid != null) {
      this.price += this.details.find(detail => {
        return detail.id === detailid;
      }).price;
    }
  }

  submit() {
    const order = new Order();
    const colorid = this.form.get('color').value;
    const engineid = this.form.get('engine').value;
    const tireid = this.form.get('tire').value;
    const detailid = this.form.get('detail').value;
    if (colorid > 0 && tireid > 0 && engineid > 0 && detailid > 0) {
      order.engine = this.engines.find(engine => {
        return engine.id === engineid;
      });
      order.color = this.colors.find(color => {
        return color.id === colorid;
      });
      order.tire = this.tires.find(tire => {
        return tire.id === tireid;
      });
      order.details = this.details.find(detail => {
        return detail.id === detailid;
      });
      order.price = this.price;
      this.ordersService.create(order).subscribe();
    }


  }
}
