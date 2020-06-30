import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/User';
import { MatTableDataSource } from '@angular/material';
import { Role } from '../models/Role';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {

  users: User[];
  displayedColumns: string[] = ['id', 'username', 'email', 'firstname',
  'lastname', 'roles', 'enabled', 'delete', 'changeRole'];
  dataSource: MatTableDataSource<User>;

  constructor(private userService: UserService) {
    userService.getAll().subscribe(data => {
      this.users = data;
      console.log(data);
      this.dataSource = new MatTableDataSource(this.users);
      console.log(this.users);
    });
  }

  ngOnInit() {
  }

  delete(userId: number) {
    this.userService.delete(userId).subscribe(() => {
      location.reload();
    });
  }

  changeRole(userId: number) {
    this.userService.changeToWorker(userId).subscribe(() => {
      location.reload();
    });
  }

  isDisabled(roles: Role[]) {
    return roles.find(role => {
      return role.roleName === 'ADMIN' || role.roleName === 'WORKER';
    });
  }

  isAdmin(roles: Role[]) {
    return roles.find(role => {
      return role.roleName === 'ADMIN';
    });
  }
}
