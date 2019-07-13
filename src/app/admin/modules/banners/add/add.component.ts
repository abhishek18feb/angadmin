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
  constructor(public fb: FormBuilder, public _admin: AdminService, public toastr: ToastrService, public _router: Router) { }


  ngOnInit() {
  }
  	addBannerForm = this.fb.group({
	  bannerHeading: ['', Validators.required],
	  bannerDescription: ['', Validators.required],
	  bannerStatus: ['', Validators.required],
	  bannerImage: ['', Validators.required]
	});
	onFileChange(event){
		if(event.target.files && event.target.files.length) {
	      const file: File = event.target.files[0];
	      this.addBannerForm.patchValue({bannerImage: file});
	      console.log(file)
	    }
	}
	onSubmit(){
		console.log(this.addBannerForm.value)
		let formData = new FormData();
      	formData.append('bannerHeading', this.addBannerForm.get('bannerHeading').value);
      	formData.append('bannerDescription', this.addBannerForm.get('bannerDescription').value);
      	formData.append('bannerImage', this.addBannerForm.get('bannerImage').value);
      	formData.append('bannerStatus', this.addBannerForm.get('bannerStatus').value);
      	this._admin.saveBanner(formData)
      	.subscribe(response=>{
      		console.log(response)
      		this.toastr.success('Banner added successfully', 'Success!');
	 		this._router.navigate(['/admin/module/banners']);
      	},
      	err=>{
      		if( err instanceof HttpErrorResponse ) {
	            if (err.status === 409) {
	              this.serverError = err.error.message
	              this.toastr.error(this.serverError);
	            }
	            if (err.status === 401) {
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
	get bannerHeading() { return this.addBannerForm.get('bannerHeading'); }
	get bannerDescription() { return this.addBannerForm.get('bannerDescription'); }
	get bannerImage() { return this.addBannerForm.get('bannerImage'); }
	get bannerStatus() { return this.addBannerForm.get('bannerStatus'); }
}
 