import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AdminService } from '../../../services/admin.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  data:any;
  serverError: any;
  categoryList: any;
  constructor(public fb: FormBuilder, public _admin: AdminService, public toastr: ToastrService, public _router: Router) { }


  ngOnInit() {
  }
    addBrandForm = this.fb.group({
	  brandName: ['', Validators.required],
	  brandStatus: ['', Validators.required]
	});

	onSubmit(){
		console.log(this.addBrandForm.value)
		let formData = new FormData();
      	this._admin.saveBrand(this.addBrandForm.value)
      	.subscribe(response=>{
      		console.log(response)
      		this.toastr.success('Brand added successfully', 'Success!');
	 				this._router.navigate(['/admin/module/brands']);
      	},
      	err=>{
      		if( err instanceof HttpErrorResponse ) {
	            if (err.status === 409) {
	              this.serverError = err.error.message
	              this.toastr.error(this.serverError);
	            }
	            if (err.status === 401) {
	              this._router.navigate(['/admin/login'])
	              this.serverError = 'Unauthorization Error plz logout and login again'
	              this.toastr.error('Unauthorization Error plz logout and login again');
	            }
	            if (err.status === 500) {
	            	console.log(err)
	              this.serverError = err.error.error;
	              this.toastr.error(err.error.error);
	            }
	        }
      	})
	}
    get brandName() { return this.addBrandForm.get('brandName'); }
	get brandStatus() { return this.addBrandForm.get('brandStatus'); }
} 
