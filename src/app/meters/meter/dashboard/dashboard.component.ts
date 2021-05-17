import { Component, OnDestroy, OnInit } from '@angular/core';
// Imports cor amcharts4
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

import { MeterDataModel } from 'src/app/share/meterdata.model';
import { MeterService } from 'src/app/share/meter.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';

/* Chart code */
// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [MeterService],
})
export class DashboardComponent implements OnInit, OnDestroy {
  public showSpinner:boolean;
  private chart: am4charts.XYChart;
  public units: string[] = ['Kwh', 'Amp'];
  public data: { datetime: Date; unitvalue: string; unit: string }[] = [];
  public mappingData: { datetime: Date; unitvalue?: string; unit?: string }[] =
    [];
  // public mappingData:Date[]=[];
  public dropDownValue: string = this.units[0];
  public datePicker: Date;
  public maxDate: Date;
  public radiooptions: string[] = ['Today', 'Month', 'Year'];
  public radiooption: string = this.radiooptions[0];

  //For data table
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private meterService: MeterService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.maxDate = this.datePicker = new Date();
  }

  ngOnInit(): void {
    this.showSpinner=true;
    this.meterService.getMeter(this.route.snapshot.params['id']).subscribe(
      (res) => {
        // console.log(res.data);
        this.meterService.meterDataInfos = res.data as MeterDataModel[];
        // setTimeout(()=>{
          this.plot();
        // },200)
      },
      (err) => {
        console.log(err);
      }
    );
    this.dtOptions = {
      retrieve: true,
      ordering: true,
      pagingType: 'full_numbers',
      pageLength: 2,
    };
  }

  ngOnDestroy(): void {
    // this.dtTrigger.unsubscribe();
    // this.dtOptions.destroy=true;
  }

  public dateMatch(date: string) {
    let datePickerSlice = new String(this.datePicker).slice(0, 15);
    let dateSlice = new String(new Date(date)).slice(0, 15);
    // console.log(dateSlice);
    return datePickerSlice === dateSlice;
  }
  public daysInMonth() {
    return new Date(
      this.datePicker.getFullYear(),
      this.datePicker.getMonth(),
      0
    ).getDate();
  }

  public setMappingData() {
    if (this.radiooption === 'Month') {
      // console.log(this.daysInMonth());
      for (let d: number = 1; d <= this.daysInMonth(); d++) {
        let date = new Date();
        date.setDate(d);
        // console.log(date);
        this.mappingData.push({ datetime: date, });
      }
      // console.log(this.mappingData);
    } else {
      for (var t = 0; t <= 23; t++) {
        let time = new Date();
        time.setHours(t);
        this.mappingData.push({ datetime: time });
      }
    }

    // console.log(this.mappingData);
  }

  public pushData() {
    if (this.radiooption === 'Month') {
      //filter data
      console.log(this.meterService.meterDataInfos);
      this.meterService.meterDataInfos.forEach((value) => {
        if (
          this.dropDownValue === value.unit &&
          this.datePicker.getMonth() === new Date(value.datetime).getMonth() &&
          this.datePicker.getFullYear() ===
            new Date(value.datetime).getFullYear()
        ) {
          this.data.push({
            datetime: new Date(value.datetime),
            unit: value.unit,
            unitvalue: value.unitvalue,
          });
        }
      });
      console.log(this.data)

      this.setMappingData();

        for (let l = 0; l < this.mappingData.length; l++) {
         let mappingDate = this.mappingData[l].datetime.getDate();
         let sum:number;
         for (let loop = 0; loop < this.data.length; loop++) {
           let dataDate = this.data[loop].datetime.getDate();
           if (mappingDate === dataDate) {
              // console.log("Print "+mappingDate+" "+dataDate);
              sum+=parseInt(this.data[loop].unitvalue);
              this.mappingData[l].unitvalue = this.data[loop].unitvalue;
           }
         }
         console.log(sum);
       }
    } else if (this.radiooption === 'Today') {
      // Filter Data
      let datalist = this.meterService.meterDataInfos.filter(
        (info) =>
          info.unit === this.dropDownValue && this.dateMatch(info.datetime)
      );
      console.log(datalist);

      // Assigning Data for table
      datalist.forEach((value) => {
        this.data.push({
          datetime: new Date(value.datetime),
          unitvalue: value.unitvalue,
          unit: value.unit,
        });
      });

      // Assigning data for chart
      this.setMappingData();
      for (let l = 0; l < this.mappingData.length; l++) {
        let mappingHour = this.mappingData[l].datetime.getHours();
        for (let loop = 0; loop < this.data.length; loop++) {
          let dataHour = this.data[loop].datetime.getHours();
          if (mappingHour === dataHour) {
            this.mappingData[l].unitvalue = this.data[loop].unitvalue;
          }
        }
      }
    }
    this.showSpinner=false;
  }

  public plot() {
    
    // console.log(this.dropDownValue + ' ' + this.datePicker);
    this.chart = am4core.create('chartdiv', am4charts.XYChart);
    // for(let i=0;i<this.meterService.meterDataInfos.length;i++){
    //   this.data.push({
    //     date: new Date(this.meterService.meterDataInfos[i].datetime),
    //     value: this.meterService.meterDataInfos[i].unitvalue,
    //   });
    // }
    this.data = [];
    this.mappingData = [];
    this.pushData();
    // Add data
    this.chart.data = this.mappingData; //this.data;
    this.dtTrigger.next();

    // Create axes
    let dateAxis = this.chart.xAxes.push(new am4charts.DateAxis());

    // // Set date label formatting

    if (this.radiooption === 'Month') {
      console.log('plot Called ' + this.radiooption);
      // dateAxis.baseInterval = {
      //   timeUnit: 'hour',
      //   count: 24,
      // };
      dateAxis.dateFormats.setKey('day', 'MMMM dt');
      dateAxis.periodChangeDateFormats.setKey('day', 'MMMM dt');
    } else {
      dateAxis.baseInterval = {
        timeUnit: 'hour',
        count: 1,
      };
      dateAxis.dateFormats.setKey('hour', 'HH');
      dateAxis.periodChangeDateFormats.setKey('hour', 'HH');
    }
    dateAxis.renderer.minGridDistance = 30;

    // let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    // categoryAxis.dataFields.category = 'datetime';
    // categoryAxis.renderer.grid.template.location = 0;
    // categoryAxis.renderer.minGridDistance = 30;

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
    // Create scrollbars
    // this.chart.scrollbarX = new am4core.Scrollbar();
    // this.chart.scrollbarY = new am4core.Scrollbar();
  }

  public onClickBack() {
    this.chart.dispose();
    this.router.navigate(['/meters', 'list']);
  }

  public onChange() {
    this.showSpinner=true;
    console.log('onchange Called ' + this.radiooption);
    this.chart.dispose();
    // console.log('on date change: '+this.dropDownValue+" "+this.datePicker);
    this.plot();
  }

  public onClickRadio(event: any): void {
    if (this.radiooption === 'Today') {
      this.datePicker = new Date();
      this.onChange();
    } else if (this.radiooption == 'Month') {
      this.datePicker = new Date();
      console.log('Click Radio Working');
      this.onChange();
    }
    console.log(this.radiooption);
  }
}
