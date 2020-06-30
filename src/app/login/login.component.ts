import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public show = false;
  private popUpText = 'Something gone wrong';
  private captchaVerify = false;
  reCaptcha: any[];
  constructor(private authService: AuthenticationService,
              private router: Router) { }

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  ngOnInit() {
  }

  submit() {
    this.authService.login(this.form.controls.username.value, this.form.controls.password.value).pipe(first()).subscribe(data => {
      this.router.navigate(['']);
    },
      error => {
          this.show = true;
          this.popUpText = 'Login problem!';
          this.router.navigate(['/login']);
      });
  }
}
