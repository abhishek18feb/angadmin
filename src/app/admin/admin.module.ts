import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { LoginLayoutComponent } from './login-layout/login-layout.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { HeaderComponent } from './elements/header/header.component';
import { TopnavComponent } from './elements/topnav/topnav.component';
import { SidenavComponent } from './elements/sidenav/sidenav.component';
import { FooterComponent } from './elements/footer/footer.component';
import { LoginComponent } from './loginelements/login/login.component';
import { SignupComponent } from './loginelements/signup/signup.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { AuthService } from './services/auth.service';
import { AdminService } from './services/admin.service'; 
import { TokenInterceptorService } from './services/token-interceptor.service'; 
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


@NgModule({
  declarations: [LoginLayoutComponent, AdminLayoutComponent, HeaderComponent, TopnavComponent, SidenavComponent, FooterComponent, LoginComponent, SignupComponent, DashboardComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [AuthService, AdminService, 
  {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }]
})
export class AdminModule { }
