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
  constructor(public acroute: ActivatedRoute ,public fb: FormBuilder, public _admin: AdminService, public toastr: ToastrService, public _router: Router) { }


  ngOnInit() {
  		this._admin.getAllCategory()
    	.subscribe(data=>{
    		this.categoryList = data.result.category;
    		console.log(this.categoryList)
    		
    	},
    	err=>{

    	})
    	this.fetchData()
  }
 fetchData(){
  	const id = this.acroute.snapshot.paramMap.get('id');
  	console.log(id)
  	this._admin.getSingleSubCategory(id)
  	.subscribe(response=>{
  		console.log(response)
  		this.data = response.body.result;

  		this.editSubcategoryForm.patchValue({
  			categoryName: this.data.categoryName._id,
  			SubCategoryName: this.data.SubCategoryName,
  			subcategoryStatus: this.data.subcategoryStatus
  		})
  	},
  	err=>{

  	})
  }

  	editSubcategoryForm = this.fb.group({
	  categoryName: ['', Validators.required],
	  SubCategoryName: ['', Validators.required],
	  subcategoryStatus: ['', Validators.required]
	});
	onSubmit(){
		console.log(this.editSubcategoryForm.value)
		let formData = new FormData();
      	// formData.append('categoryName', this.editSubcategoryForm.get('categoryName').value);
      	// formData.append('SubCategoryName', this.editSubcategoryForm.get('SubCategoryName').value);
      	// formData.append('subcategoryStatus', this.editSubcategoryForm.get('subcategoryStatus').value);
      	this._admin.updateSubCategory(this.editSubcategoryForm.value, this.data._id)
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
	get categoryName() { return this.editSubcategoryForm.get('categoryName'); }
	get SubCategoryName() { return this.editSubcategoryForm.get('SubCategoryName'); }
	get subcategoryStatus() { return this.editSubcategoryForm.get('subcategoryStatus'); }

} 
