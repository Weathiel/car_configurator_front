import { Component, OnInit } from '@angular/core';
import { AuthGuard } from '../auth.gourd';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  loggedIn = false;
  isUser = false;
  isWorker = false;
  isAdmin = false;

  constructor(private authService: AuthenticationService) {
    this.authService.currentUser.subscribe(data => {
      this.isAdmin = false;
      this.isUser = false;
      this.isWorker = false;
      this.loggedIn = !!data;
      if (!!data) {
        data.role.forEach(role => {
          if (role.roleName === 'ADMIN') {
            this.isAdmin = true;
          }
          if (role.roleName === 'WORKER') {
            this.isWorker = true;
          }
          if (role.roleName === 'USER') {
            this.isUser = true;
          }
          console.log(role.roleName);
        });
      }
    });
  }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
    this.loggedIn = false;
  }

}
