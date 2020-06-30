import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../services/user.service';
import { User } from '../models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  reCaptcha: any[];
  public show = false;
  private popUpText = 'Something gone wrong';
  private captchaVerify = false;
  constructor(private userService: UserService,
              private router: Router) { }

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    email: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl('')
  });

  ngOnInit() {
  }

  submit() {
    if (this.captchaVerify === true) {
      const user = new User();
      user.username = this.form.get('username').value;
      user.password = this.form.get('password').value;
      user.email = this.form.get('email').value;
      user.firstName = this.form.get('firstName').value;
      user.lastName = this.form.get('lastName').value;
      this.userService.register(user).subscribe(data => {
        this.router.navigate(['/login']);
        });

    } else {
      this.popUpText = 'Captcha problem!';
    }

  }

  resolved(captchaResponse: any[]) {
    this.reCaptcha = captchaResponse;
    this.userService.reCaptchaVerify(captchaResponse).subscribe(data => {
      this.captchaVerify = true;
    },
      error => {
        this.popUpText = 'Captcha problem!';
        this.show = true;
      });
  }

}
