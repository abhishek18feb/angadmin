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
    	this._admin.getAllCategory()
    	.subscribe(data=>{
    		this.categoryList = data.result.category;
    		console.log(this.categoryList)
    		
    	},
    	err=>{

    	})

    }
	addSubcategoryForm = this.fb.group({
	  categoryName: ['', Validators.required],
	  SubCategoryName: ['', Validators.required],
	  subcategoryStatus: ['', Validators.required]
	});

	onSubmit(){
		console.log(this.addSubcategoryForm.value)
		let formData = new FormData();
      	// formData.append('categoryName', this.addSubcategoryForm.get('categoryName').value);
      	// formData.append('SubCategoryName', this.addSubcategoryForm.get('SubCategoryName').value);
      	// formData.append('subcategoryStatus', this.addSubcategoryForm.get('subcategoryStatus').value);
      	this._admin.saveSubCategory(this.addSubcategoryForm.value)
      	.subscribe(response=>{
      		console.log(response)
      		this.toastr.success('Sub Category added successfully', 'Success!');
	 				this._router.navigate(['/admin/module/subcategories']);
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
	get categoryName() { return this.addSubcategoryForm.get('categoryName'); }
	get SubCategoryName() { return this.addSubcategoryForm.get('SubCategoryName'); }
	get subcategoryStatus() { return this.addSubcategoryForm.get('subcategoryStatus'); }
}
 