import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { SubcategoryRoutingModule, SubcategoryComponent } from './subcategory-routing.module';
import { SearchPipe } from './search.pipe';

@NgModule({
  declarations: [SubcategoryComponent,  SearchPipe],
  imports: [
    CommonModule,
    SubcategoryRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger' // set defaults here
    })
  ]
})
export class SubcategoryModule { } 
