import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth.gourd';
import { OrderComponent } from './order/order.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { UsersOrdersComponent } from './users-orders/users-orders.component';
import { UserManagementComponent } from './user-management/user-management.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'en', redirectTo: '/en/home', pathMatch: 'full' },
  { path: 'pl', redirectTo: '/pl/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'order', component: OrderComponent },
  { path: 'myorder', component: MyOrdersComponent },
  { path: 'userorder', component: UsersOrdersComponent},
  { path: 'usermanagement', component: UserManagementComponent},
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
