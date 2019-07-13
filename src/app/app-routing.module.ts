import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
	    path: '',
	    redirectTo: '',
	    pathMatch: 'full'
    },
	{
	    path: 'admin',
	    loadChildren: './admin/admin.module#AdminModule'
    },
    {
	    path: 'web',
	    loadChildren: './web/web.module#WebModule'
    }
    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
