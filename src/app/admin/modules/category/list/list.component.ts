import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AdminService } from '../../../services/admin.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html', 
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  data:any;
  serverError: any;
  listItems: any;
    public popoverTitle: string = 'Are you sure';
  public popoverMessage: string = 'You want to delete this category';
  constructor(public fb: FormBuilder, public _admin: AdminService, public toastr: ToastrService, public _router: Router) { }


    ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this._admin.getAllCategory()
    .subscribe(
      res => {
        this.listItems = res.result.category;
        console.log(this.listItems);
      },
      err => {  console.log(err)
                if( err instanceof HttpErrorResponse ) {
                  if (err.status === 409) {
                    this.serverError = err.error.message
                  }
                  if (err.status === 401) {
                    this.serverError = 'Unauthorization Error plz logout and login again'
                  }
                }
            }
    )
  }

  deleteCategory(id){
    console.log(id);
    this._admin.deleteCategory(id).subscribe(
      res=> {
        this.toastr.success('Category Deleted Successfully', 'Success :)');
        this.fetchData();
      },
      err => {
        if (err.status === 500) {
          console.log(err)
          this.serverError = err.error
          this.toastr.error(err.error, '!Error');
        }else{
          this.toastr.error('Unknown error please check you input and try again', '!Error');
        }
      }
    )
  }
  changeStatus(id){
    console.log(id)
    this._admin.changeCategoryStatus(id).subscribe(
      res=>{
        console.log(res)
         this.toastr.success('Status updated Successfully', 'Success :)');
        this.fetchData();
      },
      err=>{
        if (err.status === 404) {
          console.log(err)
          this.serverError = err.error
          this.toastr.error(err.error, '!Error');
        }else{
          this.toastr.error('Unknown error please check you input and try again', '!Error');
        }
      }
    )
  }

}
