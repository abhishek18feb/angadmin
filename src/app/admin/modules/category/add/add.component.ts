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
	addCategoryForm = this.fb.group({
	  categoryName: ['', Validators.required],
	  categoryStatus: ['', Validators.required],
	  categoryIcon: ['', Validators.required]
	});
	onFileChange(event){
		if(event.target.files && event.target.files.length) {
	      const file: File = event.target.files[0];
	      this.addCategoryForm.patchValue({categoryIcon: file});
	      console.log(file)
	    }
	}
	onSubmit(){
		console.log(this.addCategoryForm.value)
		let formData = new FormData();
      	formData.append('categoryName', this.addCategoryForm.get('categoryName').value);
      	formData.append('categoryStatus', this.addCategoryForm.get('categoryStatus').value);
      	formData.append('categoryIcon', this.addCategoryForm.get('categoryIcon').value);
      	this._admin.saveCategory(formData)
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
	            }
	            if (err.status === 500) {
	            	console.log(err)
	              this.serverError = err.error.error;
	              this.toastr.error(err.error.error);
	            }
	        }
      	})
	}
	get categoryName() { return this.addCategoryForm.get('categoryName'); }
	get categoryStatus() { return this.addCategoryForm.get('categoryStatus'); }
	get categoryIcon() { return this.addCategoryForm.get('categoryIcon'); }
}
