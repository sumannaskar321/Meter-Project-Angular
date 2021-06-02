import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDataComponent } from './add-data/add-data.component';
import { AssetClassComponent } from './asset-class/asset-class.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DataComponent } from './data/data.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { GlobalDashboardComponent } from './global-dashboard/global-dashboard.component';
import { GlobalPlotlyDashboardComponent } from './global-plotly-dashboard/global-plotly-dashboard.component';
import { PlotlyDashboardComponent } from './plotly-dashboard/plotly-dashboard.component';
import { SuggestionBoxComponent } from './suggestion-box/suggestion-box.component';
import { UploadCusumComponent } from './upload-cusum/upload-cusum.component';
import { UploadDisplayNameComponent } from './upload-display-name/upload-display-name.component';

const routes: Routes = [
  { path: 'list/:id', component: DataComponent },
  { path: 'add/:id', component: AddDataComponent },
  { path: 'edit/:id/:dataid',component:AddDataComponent},
  { path: 'dashboard',component:GlobalDashboardComponent},
  { path: 'plotly-dashboard',component:GlobalPlotlyDashboardComponent},
  { path:'dashboard/:id',component:DashboardComponent},
  { path:'plotly-dashboard/:id',component:PlotlyDashboardComponent},
  { path: 'file-upload',component:FileUploadComponent},
  { path: 'assetclass-tags-upload',component:AssetClassComponent},
  { path: 'upload-cusum',component:UploadCusumComponent},
  { path: 'upload-display-name',component:UploadDisplayNameComponent},
  { path: 'suggestion-box',component:SuggestionBoxComponent},
  { path: '', pathMatch:'full',redirectTo:'list/:id'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MeterRoutingModule {}
