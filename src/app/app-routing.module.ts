import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

// getting error ->loadChildren:'./meters/meters-routing.module#MetersRoutingModule'
const routes: Routes = [
  { path: 'home', component: HomeComponent },
  //use like this to avoid error
  { path: 'meters',loadChildren:() => import('./meters/meters-routing.module').then(m => m.MetersRoutingModule)},
  { path: '',pathMatch:'full', redirectTo:'/home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
