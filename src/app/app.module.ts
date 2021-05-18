import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MetersComponent } from './meters/meters.component';
import { AddMeterComponent } from './meters/add-meter/add-meter.component';
import { MeterComponent } from './meters/meter/meter.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DataComponent } from './meters/meter/data/data.component';
import { AddDataComponent } from './meters/meter/add-data/add-data.component';
import { DashboardComponent } from './meters/meter/dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatGridListModule } from '@angular/material/grid-list';
import { DataTablesModule } from 'angular-datatables';
import { GlobalDashboardComponent } from './meters/meter/global-dashboard/global-dashboard.component';
import { PlotlyDashboardComponent } from './meters/meter/plotly-dashboard/plotly-dashboard.component';
import * as PlotlyJS from 'plotly.js/dist/plotly.js';
import { PlotlyModule } from 'angular-plotly.js';
import { GlobalPlotlyDashboardComponent } from './meters/meter/global-plotly-dashboard/global-plotly-dashboard.component';

PlotlyModule.plotlyjs = PlotlyJS;

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MetersComponent,
    AddMeterComponent,
    MeterComponent,
    DataComponent,
    AddDataComponent,
    DashboardComponent,
    GlobalDashboardComponent,
    PlotlyDashboardComponent,
    GlobalPlotlyDashboardComponent,
  ],
  imports: [
    BrowserModule,CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    DataTablesModule,PlotlyModule
  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
