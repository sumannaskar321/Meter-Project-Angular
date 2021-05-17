import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDataComponent } from './add-data/add-data.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DataComponent } from './data/data.component';
import { GlobalDashboardComponent } from './global-dashboard/global-dashboard.component';

const routes: Routes = [
  { path: 'list/:id', component: DataComponent },
  { path: 'add/:id', component: AddDataComponent },
  { path: 'edit/:id/:dataid',component:AddDataComponent},
  { path: 'dashboard',component:GlobalDashboardComponent},
  { path:'dashboard/:id',component:DashboardComponent},
  { path: '', pathMatch:'full',redirectTo:'list/:id'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MeterRoutingModule {}
