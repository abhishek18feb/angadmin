import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebRoutingModule } from './web-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule }   from '@angular/forms';

@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    WebRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class WebModule { }
