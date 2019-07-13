import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import{ PasswordValidation } from '../../password-validation';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  data:any;
  serverError: any;
  constructor(public fb: FormBuilder, public _auth: AuthService, public toastr: ToastrService, public _router: Router) { }

  		loginForm = this.fb.group({
		  username: ['', Validators.required],
		  password: ['', Validators.required],
		});
  ngOnInit() {
  }
  	loginUser () {
      this._auth.loginUser(this.loginForm.value)
      .subscribe(
        res => {
          localStorage.setItem('token', res.token)
          localStorage.setItem('name', res.data.name)
          localStorage.setItem('profileImageName', res.data.profileImageName)
          this._router.navigate(['/admin/module'])
        },
        err => console.log(err)
      )
    }

  	get username() { return this.loginForm.get('username'); }
	get password() { return this.loginForm.get('password'); }
}
