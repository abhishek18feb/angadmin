import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AdminService } from '../../../services/admin.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

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
  	this._admin.getSingleCategory(id)
  	.subscribe(response=>{
  		console.log(response)
  		this.data = response.body.result;

  		this.editCategoryForm.patchValue({
  			categoryName: this.data.categoryName,
  			categoryStatus: this.data.categoryStatus
  		})
  	},
  	err=>{

  	})
  }
  editCategoryForm = this.fb.group({
	  categoryName: ['', Validators.required],
	  categoryStatus: ['', Validators.required],
	  categoryIcon: ['']
   });

  onFileChange(event){
		if(event.target.files && event.target.files.length) {
	      const file: File = event.target.files[0];
	      this.editCategoryForm.patchValue({categoryIcon: file});
	      console.log(file)
	    }
	}
	onSubmit(){
		//console.log(this.editCategoryForm.value)
		let formData = new FormData();
      	formData.append('categoryName', this.editCategoryForm.get('categoryName').value);
      	formData.append('categoryStatus', this.editCategoryForm.get('categoryStatus').value);
      	formData.append('categoryIcon', this.editCategoryForm.get('categoryIcon').value);
      	this._admin.updateCategory(formData, this.data._id)
      	.subscribe(response=>{
      		console.log(response)
      		this.toastr.success('Category added successfully', 'Success!');
	 				this._router.navigate(['/admin/module/categories']);
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
	              this._router.navigate(['/admin/login'])
	            }
	            if (err.status === 500) {
	            	console.log(err)
	              this.serverError = err.error.error;
	              this.toastr.error(err.error.error);
	            }
	        }
      	})
	}
	get categoryName() { return this.editCategoryForm.get('categoryName'); }
	get categoryStatus() { return this.editCategoryForm.get('categoryStatus'); }
	get categoryIcon() { return this.editCategoryForm.get('categoryIcon'); }


}
