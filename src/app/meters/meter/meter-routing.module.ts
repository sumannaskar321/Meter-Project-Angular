import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDataComponent } from './add-data/add-data.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DataComponent } from './data/data.component';
import { GlobalDashboardComponent } from './global-dashboard/global-dashboard.component';
import { GlobalPlotlyDashboardComponent } from './global-plotly-dashboard/global-plotly-dashboard.component';
import { PlotlyDashboardComponent } from './plotly-dashboard/plotly-dashboard.component';

const routes: Routes = [
  { path: 'list/:id', component: DataComponent },
  { path: 'add/:id', component: AddDataComponent },
  { path: 'edit/:id/:dataid',component:AddDataComponent},
  { path: 'dashboard',component:GlobalDashboardComponent},
  { path: 'plotly-dashboard',component:GlobalPlotlyDashboardComponent},
  { path:'dashboard/:id',component:DashboardComponent},
  { path:'plotly-dashboard/:id',component:PlotlyDashboardComponent},
  { path: '', pathMatch:'full',redirectTo:'list/:id'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MeterRoutingModule {}
