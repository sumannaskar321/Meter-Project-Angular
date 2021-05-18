import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { MeterService } from 'src/app/share/meter.service';
import { MeterDataModel } from 'src/app/share/meterdata.model';
import * as PlotlyJS from 'plotly.js/dist/plotly.js';

@Component({
  selector: 'app-global-plotly-dashboard',
  templateUrl: './global-plotly-dashboard.component.html',
  styleUrls: ['./global-plotly-dashboard.component.css'],
})
export class GlobalPlotlyDashboardComponent implements OnInit {
  public today: Date;
  public showSpinner: boolean;
  public meterList: Observable<any>;
  public mappingData: { datetime: Date; unitvalue?: string; unit?: string }[] =
    [];
  constructor(
    private meterService: MeterService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.today = new Date();
  }

  ngOnInit(): void {
    this.showSpinner = true;
    this.meterService.getMeterList().subscribe(
      (res) => {
        this.meterList = res;
        this.meterList.forEach((meter) => {
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
          let mapdata = this.mappingData;
          //Calling map
          setTimeout(() => {
          this.plot(meter, mapdata);  
          }, 100);
          
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }

  public plot(
    meter: any,
    mapdata: 
    {
      datetime: Date;
      unitvalue?: string;
      unit?: string;
    }[]
  )
  {
    var data = [
      {
        x: mapdata.map((d) => d.datetime),
        y: mapdata.map((d) => d.unitvalue),
        type: 'bar',
      },
    ];
   var layout= {
        title: `${meter._id}`,
        xaxis: { tickangle: -45},
        yaxis: { zeroline: false },
      };

      PlotlyJS.newPlot(meter._id, data,layout);
       this.showSpinner = false;
  }

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
    return todayDateSlice === dateSlice;
  }
  public onClickBack() {
    this.router.navigate(['/meters', 'list']);
  }
    public onClickGridTile(id: string) {
    this.router.navigate(['/meters', 'data', 'plotly-dashboard', id]);
  }
}
