import { Engine } from './Engine';
import { Tire } from './Tire';
import { Details } from './Details';
import { Color } from './Color';
import { User } from './User';

export class Order {
    id: number;
    color: Color;
    engine: Engine;
    tire: Tire;
    details: Details;
    user: User;
    archivized: boolean;
    price: number;
}
