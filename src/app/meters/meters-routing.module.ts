import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddMeterComponent } from './add-meter/add-meter.component';
import { DataComponent } from './meter/data/data.component';
import { MeterComponent } from './meter/meter.component';

const routes: Routes = [
  { path: 'list', component: MeterComponent },
  { path: 'add', component: AddMeterComponent },
  { path: 'edit/:id', component: AddMeterComponent },
  { path:'data', loadChildren:() => import('./meter/meter-routing.module').then(m => m.MeterRoutingModule)},
  { path: '', pathMatch:'full',redirectTo:'list'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MetersRoutingModule {}
