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
	categoryList: any;
	constructor(public acroute: ActivatedRoute, public fb: FormBuilder, public _admin: AdminService, public toastr: ToastrService, public _router: Router) { }

	ngOnInit() {
		this.fetchData();
	}

	fetchData(){
	  	const id = this.acroute.snapshot.paramMap.get('id');
	  	console.log(id)
	  	this._admin.getSingleTags(id)
	  	.subscribe(response=>{
	  		console.log(response)
	  		this.data = response.body.result;

	  		this.editTagForm.patchValue({
	  			tagName: this.data.tagName,
	  			tagStatus: this.data.tagStatus
	  		})
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
    editTagForm = this.fb.group({
	  tagName: ['', Validators.required],
	  tagStatus: ['', Validators.required]
	});

	onSubmit(){
		console.log(this.editTagForm.value)
		let formData = new FormData();
      	this._admin.UpdateTag(this.editTagForm.value, this.data._id)
      	.subscribe(response=>{
      		console.log(response)
      		this.toastr.success('Tag Updated successfully', 'Success!');
	 				this._router.navigate(['/admin/module/tags']);
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
    get tagName() { return this.editTagForm.get('tagName'); }
	get tagStatus() { return this.editTagForm.get('tagStatus'); }
 
}
