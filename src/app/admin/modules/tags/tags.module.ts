import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagsRoutingModule, TagsComponent } from './tags-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { SearchFilterPipe } from './search-filter.pipe';


@NgModule({
  declarations: [TagsComponent, SearchFilterPipe], 
  imports: [
    CommonModule,
    TagsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger' // set defaults here
    })
  ]
})
export class TagsModule { }
