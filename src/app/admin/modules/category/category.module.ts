import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { CategoryRoutingModule, CategoryComponent } from './category-routing.module';
import { SearchfilterPipe } from './searchfilter.pipe';


@NgModule({
  declarations: [CategoryComponent, SearchfilterPipe],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger' // set defaults here
    })
  ]
})
export class CategoryModule { }
