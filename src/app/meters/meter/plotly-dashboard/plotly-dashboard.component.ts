import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MeterService } from 'src/app/share/meter.service';
import { MeterDataModel } from 'src/app/share/meterdata.model';

@Component({
  selector: 'app-plotly-dashboard',
  templateUrl: './plotly-dashboard.component.html',
  styleUrls: ['./plotly-dashboard.component.css'],
})
export class PlotlyDashboardComponent implements OnInit {
  public showSpinner: boolean;
  public mappingData: { datetime: Date; unitvalue?: string; unit?: string }[] =
    [];
  public graph;
  public today: Date;
  constructor(
    private meterService: MeterService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.today = new Date();
  }

  ngOnInit(): void {
     this.showSpinner = true;
    this.meterService.getMeter(this.route.snapshot.params['id']).subscribe(
      (res) => {
        this.showSpinner = false;
        this.plot(res.data as MeterDataModel[]);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  public dateMatch(date: string) {
    let datePickerSlice = new String(this.today).slice(0, 15);
    let dateSlice = new String(new Date(date)).slice(0, 15);
    // console.log(dateSlice);
    return datePickerSlice === dateSlice;
  }

  public plot(datalist: MeterDataModel[]) {
    let temp: { datetime: Date; unitvalue: string; unit: string }[] = [];
    let data = datalist.filter(
      (d) => d.unit === 'Kwh' && this.dateMatch(d.datetime)
    );

    data.forEach((value) => {
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
    this.graph = {
      data: [
        {
          x: this.mappingData.map((d) => d.datetime),
          y: this.mappingData.map((d) => d.unitvalue),
          type: 'bar',
        },
      ],
      layout: {
        title: `${this.today}`.slice(0, 15),
        xaxis: {
          tickangle: -45,
        },
        yaxis: { zeroline: false },
      },
    };
  }

  public setMappingData() {
    this.mappingData = [];
    for (var t = 0; t <= 23; t++) {
      let time = new Date();
      time.setHours(t);
      this.mappingData.push({ datetime: time });
    }
  }

  public onClickBack() {
    this.router.navigate(['/meters', 'list']);
  }

  public onClick(event: any) {
    console.log(event);
  }
}
