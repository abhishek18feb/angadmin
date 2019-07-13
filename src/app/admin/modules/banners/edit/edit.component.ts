import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AdminService } from '../../../services/admin.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  data:any;
  serverError: any;
  constructor(public acroute: ActivatedRoute, public fb: FormBuilder, public _admin: AdminService, public toastr: ToastrService, public _router: Router) { }


  ngOnInit() {
  	this.fetchData();
  }

  fetchData(){
  	const id = this.acroute.snapshot.paramMap.get('id');
  	console.log(id)
  	this._admin.getSingleBanner(id)
  	.subscribe(response=>{
  		console.log(response)
  		this.data = response.body.result;

  		this.editBannerForm.patchValue({
  			bannerHeading: this.data.bannerHeading,
  			bannerDescription: this.data.bannerDescription,
  			bannerStatus: this.data.bannerStatus,
  			bannerImage: this.data.bannerImageName
  		})
  	},
  	err=>{

  	})
  }

 	editBannerForm = this.fb.group({
	  bannerHeading: ['', Validators.required],
	  bannerDescription: ['', Validators.required],
	  bannerStatus: ['', Validators.required],
	  bannerImage: ['', Validators.required]
	});
	onFileChange(event){
		if(event.target.files && event.target.files.length) {
	      const file: File = event.target.files[0];
	      this.editBannerForm.patchValue({bannerImage: file});
	      console.log(file)
	    }
	}

		onSubmit(){
		console.log(this.editBannerForm.value)
		let formData = new FormData();
      	formData.append('bannerHeading', this.editBannerForm.get('bannerHeading').value);
      	formData.append('bannerDescription', this.editBannerForm.get('bannerDescription').value);
      	formData.append('bannerImage', this.editBannerForm.get('bannerImage').value);
      	formData.append('bannerStatus', this.editBannerForm.get('bannerStatus').value);
      	this._admin.updateBanner(formData, this.data._id)
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
	get bannerHeading() { return this.editBannerForm.get('bannerHeading'); }
	get bannerDescription() { return this.editBannerForm.get('bannerDescription'); }
	get bannerImage() { return this.editBannerForm.get('bannerImage'); }
	get bannerStatus() { return this.editBannerForm.get('bannerStatus'); }

}
