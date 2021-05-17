import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { MeterService } from 'src/app/share/meter.service';
import { Observable } from 'rxjs';
import { MeterDataModel } from 'src/app/share/meterdata.model';

am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-global-dashboard',
  templateUrl: './global-dashboard.component.html',
  styleUrls: ['./global-dashboard.component.css'],
})
export class GlobalDashboardComponent implements OnInit, AfterViewInit {
  public showSpinner: boolean;
  public meterList: Observable<any>;
  public today: Date;
  private chart: am4charts.XYChart;
  public mappingData: { datetime: Date; unitvalue?: string; unit?: string }[] =
    [];

  constructor(private router: Router, private mService: MeterService) {
    this.today = new Date();
  }

  ngOnInit(): void {
    this.showSpinner = true;
    this.loadMeterList();
  }
  ngAfterViewInit() {
    // this.meterList.forEach((meter) => {
    //     // this.pushData(meter.data as MeterDataModel[]);
    //     //  setTimeout(() => {
    //     this.plot(meter);
    //   // },1000);
    //     // this.createDivId(this.count);
    //   });
  }

  public loadMeterList() {
    this.mService.getMeterList().subscribe((res) => {
      this.meterList = res;
      this.meterList.forEach((meter) => {
        // this.pushData(meter.data as MeterDataModel[]);
        this.mappingData = [];
        let temp: { datetime: Date; unitvalue: string; unit: string }[] = [];
        // Filter Data
        let datalist = meter.data as MeterDataModel[];
        let DataList = datalist.filter(
          (info) => info.unit === 'Kwh' && this.dateMatch(info.datetime)
        );
        // console.log(DataList);

        // Assigning Data for table
        DataList.forEach((value) => {
          temp.push({
            datetime: new Date(value.datetime),
            unitvalue: value.unitvalue,
            unit: value.unit,
          });
        });

        // Assigning data for chart
        this.setMappingData();
        for (let l = 0; l < this.mappingData.length; l++) {
          let mappingHour = this.mappingData[l].datetime.getHours();
          for (let loop = 0; loop < temp.length; loop++) {
            let dataHour = temp[loop].datetime.getHours();
            if (mappingHour === dataHour) {
              this.mappingData[l].unitvalue = temp[loop].unitvalue;
            }
          }
        }
        let mapdata=this.mappingData;
        //Calling map
        setTimeout(() => {
          this.plot(meter,mapdata);
        }, 50);

      });

    });
  }


  public plot(meter: any,data:any) {
    this.chart = am4core.create(meter._id, am4charts.XYChart);

    // Add data
console.log(data);
    this.chart.data = data; 
    // Create axes
    let dateAxis = this.chart.xAxes.push(new am4charts.DateAxis());

    // Set date label formatting
    dateAxis.baseInterval = {
      timeUnit: 'hour',
      count: 1,
    };
    dateAxis.dateFormats.setKey('hour', 'HH');
    dateAxis.periodChangeDateFormats.setKey('hour', 'HH');
    dateAxis.renderer.minGridDistance = 30;

    let valueAxis = this.chart.yAxes.push(new am4charts.ValueAxis());

    // Create series
    let series = this.chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = 'unitvalue'; //'unitvalue';
    // series.dataFields.categoryX = 'datetime';
    series.dataFields.dateX = 'datetime'; //'datetime';
    series.name = 'UnitValue';

    series.columns.template.tooltipText = '{dateX}: [bold]{valueY}[/]';
    series.columns.template.fillOpacity = 1;

    let columnTemplate = series.columns.template;
    columnTemplate.strokeWidth = 2;
    columnTemplate.strokeOpacity = 1;
    this.showSpinner = false;
  }

  // public pushData(datalist: MeterDataModel[]) {
  //   // console.log(this.mappingData);
  //   let temp: { datetime: Date; unitvalue: string; unit: string }[] = [];
  //   // Filter Data
  //   let DataList = datalist.filter(
  //     (info) => info.unit === 'Kwh' && this.dateMatch(info.datetime)
  //   );
  //   // console.log(DataList);

  //   // Assigning Data for table
  //   DataList.forEach((value) => {
  //     temp.push({
  //       datetime: new Date(value.datetime),
  //       unitvalue: value.unitvalue,
  //       unit: value.unit,
  //     });
  //   });

  //   // Assigning data for chart
  //   this.setMappingData();
  //   for (let l = 0; l < this.mappingData.length; l++) {
  //     let mappingHour = this.mappingData[l].datetime.getHours();
  //     for (let loop = 0; loop < temp.length; loop++) {
  //       let dataHour = temp[loop].datetime.getHours();
  //       if (mappingHour === dataHour) {
  //         this.mappingData[l].unitvalue = temp[loop].unitvalue;
  //       }
  //     }
  //   }
  //   // console.log(this.mappingData);
  //   this.listMappingData.push(this.mappingData);
  //   // this.plot(0);
  // }

  public setMappingData() {
    this.mappingData = [];
    for (var t = 0; t <= 23; t++) {
      let time = new Date();
      time.setHours(t);
      this.mappingData.push({ datetime: time });
    }
  }

  public dateMatch(date: string) {
    let todayDateSlice = new String(this.today).slice(0, 15);
    let dateSlice = new String(new Date(date)).slice(0, 15);
    // console.log(dateSlice);
    return todayDateSlice === dateSlice;
  }
  public onClickBack() {
    am4core.disposeAllCharts();
    this.router.navigate(['/meters', 'list']);
  }
  public onClickGridTile(id: string) {
    am4core.disposeAllCharts();
    this.router.navigate(['/meters', 'data', 'dashboard', id]);
  }
}
