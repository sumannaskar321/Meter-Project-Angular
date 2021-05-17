import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MeterService } from 'src/app/share/meter.service';
import { MeterDataModel } from 'src/app/share/meterdata.model';

@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.css'],
})
export class AddDataComponent implements OnInit {
  public meterDataForm: FormGroup;
  constructor(
    private router: Router,
    private meterService: MeterService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    this.formInit();

    // console.log(this.route.snapshot.params['id']+'  '+this.route.snapshot.params['dataid']);

    if(this.route.snapshot.params['dataid']!==undefined){
          this.meterService.getMeter( this.route.snapshot.params['id'])
    .subscribe(
      res=>{
        // console.log(res.data);
        this.meterService.meterDataInfos = res.data as MeterDataModel[];

        let meterData = this.meterService.meterDataInfos.filter(meterData=>meterData._id===this.route.snapshot.params['dataid']);

        this.meterDataForm.patchValue({
          datetime:meterData[0].datetime?meterData[0].datetime:'',
          unit: meterData[0].unit?meterData[0].unit:'',
          unitvalue:meterData[0].unitvalue?meterData[0].unitvalue:'',
        });
        // console.log(meterData);
      },
      err=>{
        console.log(err);
      }
    );
    }
  }

  public formInit(): void {
    this.meterDataForm = new FormGroup({
      datetime: new FormControl(
        this.meterService.selectedMeterData.datetime, Validators.required
      ),
      unit: new FormControl(
        this.meterService.selectedMeterData.unit,
        Validators.required
      ),
      unitvalue: new FormControl(
        this.meterService.selectedMeterData.unitvalue,
        Validators.required
      ),
    });
  }

  onClickCancel(){
    this.router.navigate(['/meters','data','list',this.route.snapshot.params['id']]);
  }

  onSubmit() {
    if(this.route.snapshot.params['dataid']!==undefined){
      this.meterService.selectedMeterData.unit = this.meterDataForm.value.unit;
    this.meterService.selectedMeterData.unitvalue = this.meterDataForm.value.unitvalue;
    this.meterService.selectedMeterData.datetime = this.meterDataForm.value.datetime;
      this.meterService.editMeterData(this.route.snapshot.params['dataid']).subscribe(
        res=>{
          // console.log(res);
          this.meterDataForm.reset();
          this.meterService.selectedMeterData={unit:'',datetime:'',unitvalue:''};
          this.router.navigate(['/meters','data','list',this.route.snapshot.params['id']]);
        },
        err=>{
          console.log(err);
        }
      );

    }else{
    this.meterService.selectedMeterData.unit = this.meterDataForm.value.unit;
    //console.log(this.meterDataForm.value.unitvalue);
    this.meterService.selectedMeterData.unitvalue = this.meterDataForm.value.unitvalue;
    this.meterService.selectedMeterData.datetime = this.meterDataForm.value.datetime;
    //console.log(this.meterService.selectedMeterData);
    this.meterService.postMeterData(this.route.snapshot.params['id'])
    .subscribe(
      (res)=>{
        // console.log(res+this.route.snapshot.params['id']);
        this.meterDataForm.reset();
        this.meterService.selectedMeterData={unit:'',datetime:'',unitvalue:''};
        this.router.navigate(['/meters','data','list',this.route.snapshot.params['id'] ]);
      },
      (err)=>{console.log(err)},
    );
    }

   }


}
