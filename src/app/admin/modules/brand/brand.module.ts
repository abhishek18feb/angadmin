import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';

import { BrandRoutingModule, BrandComponent } from './brand-routing.module';
import { SearchFilterPipe } from './search-filter.pipe';



@NgModule({
  declarations: [BrandComponent, SearchFilterPipe],
  imports: [
    CommonModule,
    BrandRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger' // set defaults here
    })
  ]
})
export class BrandModule { }
