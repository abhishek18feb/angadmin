import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import{ PasswordValidation } from '../../password-validation';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  data:any;
  serverError: any;
  mobnumPattern = "^((\\+91-?)|0)?[0-9]{10}$"; 
  unamePattern = "^[a-z0-9_-]{8,15}$";
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  constructor(public fb: FormBuilder, public _auth: AuthService, public toastr: ToastrService, public _router: Router) { }

  ngOnInit() {
  	this.registrationForm.patchValue({
  		userType:1
  	})
  }

  	registrationForm = this.fb.group({
	  name: ['', Validators.required],
	  username: ['', [Validators.required, Validators.pattern(this.unamePattern)]],
	  email:['', [Validators.required, Validators.pattern(this.emailPattern)]],
	  mobile:['',  Validators.compose([
	  									Validators.required,
	  									Validators.pattern(this.mobnumPattern)
	  								]) ],
	  password:['', Validators.required],
	  confirmPassword:['', Validators.required],
	  profileImage:['', Validators.required],
	  userType:['', Validators.required]
	}, {validator: PasswordValidation.MatchPassword});

	onFileChange(event){
		if(event.target.files && event.target.files.length) {
	      const file: File = event.target.files[0];
	      this.registrationForm.patchValue({profileImage: file}); 
	      console.log(file)
	    }
	}
	onSubmit() {
		let formData = new FormData();
      	formData.append('name', this.registrationForm.get('name').value);
      	formData.append('username', this.registrationForm.get('username').value);
      	formData.append('email', this.registrationForm.get('email').value);
      	formData.append('mobile', this.registrationForm.get('mobile').value);
      	formData.append('password', this.registrationForm.get('password').value);
      	formData.append('userType', this.registrationForm.get('userType').value);
      	formData.append('profileImage', this.registrationForm.get('profileImage').value);
	 	console.log(formData);
	 	this._auth.addUser(formData).subscribe(
	 			result=>{
	 				this.toastr.success('Congrats, Your account has been created successfully', 'Success!');
	 				this._router.navigate(['/admin/login']);
	 			},
	 			err=>{
                    console.log(err)
                      if( err instanceof HttpErrorResponse ) {
                        if (err.status === 409) {
                          this.serverError = err.error.message
                          this.toastr.error(this.serverError);
                        }
                        if (err.status === 401) {
                          this.serverError = 'Unauthorization Error plz logout and login again'
                          this.toastr.error('Unauthorization Error plz logout and login again');
                        }
                      }
                  })
	 		

	}

	get name() { return this.registrationForm.get('name'); }
	get username() { return this.registrationForm.get('username'); }
	get email() { return this.registrationForm.get('email'); }
	get mobile() { return this.registrationForm.get('mobile'); }
	get profileImage() { return this.registrationForm.get('profileImage'); }
	get password() { return this.registrationForm.get('password'); }
  	get confirmPassword() { return this.registrationForm.get('confirmPassword'); }

}
