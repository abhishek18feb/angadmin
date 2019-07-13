import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginLayoutComponent } from './login-layout/login-layout.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { LoginComponent } from './loginelements/login/login.component';
import { SignupComponent } from './loginelements/signup/signup.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';
const routes: Routes = [
		
		{
			path:'', component: LoginLayoutComponent, children: [
				{path:'login', component: LoginComponent },
				{path:'signup', component: SignupComponent },
			]},
		{ path:'module' ,  component: AdminLayoutComponent, canActivate: [AuthGuard], children: [
				{path:'', component:DashboardComponent },
				{path:'categories', loadChildren: './modules/category/category.module#CategoryModule'},
				{path:'subcategories', loadChildren: './modules/subcategory/subcategory.module#SubcategoryModule'},
				{path:'brands', loadChildren: './modules/brand/brand.module#BrandModule'},
				{path: 'banners', loadChildren: './modules/banners/banners.module#BannersModule'},
				{path: 'tags', loadChildren: './modules/tags/tags.module#TagsModule'}
		]}
	];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { } 
