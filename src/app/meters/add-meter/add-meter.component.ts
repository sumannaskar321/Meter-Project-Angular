import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MeterService } from 'src/app/share/meter.service';
import { MeterInfoModel } from 'src/app/share/meterinfo.model';

@Component({
  selector: 'app-add-meter',
  templateUrl: './add-meter.component.html',
  styleUrls: ['./add-meter.component.css'],
  providers: [MeterService],
})
export class AddMeterComponent implements OnInit {
  public meterForm: FormGroup;
  constructor(
    private router: Router,
    private meterService: MeterService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.formInit();
    //    Get Value from db
    if(this.route.snapshot.params['id']!==undefined){
    this.meterService
      .getMeter(this.route.snapshot.params['id'])
      .subscribe((res) => {
        this.meterService.selectedMeter = res as MeterInfoModel;
        this.meterForm.patchValue({
          id: this.meterService.selectedMeter.id
            ? this.meterService.selectedMeter.id
            : '',
          name: this.meterService.selectedMeter.name
            ? this.meterService.selectedMeter.name
            : '',
          location: this.meterService.selectedMeter.location
            ? this.meterService.selectedMeter.location
            : '',
        });
      });
    }

    //console.log('Id:' + this.route.snapshot.params['id']);
    //if(this.meterService.selectedMeter._id===this.route.snapshot.params['id']){

    //}
  }

  public formInit(): void {
    this.meterForm = new FormGroup({
      id: new FormControl(
        this.meterService.selectedMeter.id,
        Validators.required
      ),
      name: new FormControl(
        this.meterService.selectedMeter.name,
        Validators.required
      ),
      location: new FormControl(
        this.meterService.selectedMeter.location,
        Validators.required
      ),
    });
  }

  public onSubmit() {

    //let id: string = this.route.snapshot.params['id'];
    console.log('Id:'+this.route.snapshot.params['id']+'selectedMeter._id :'+this.meterService.selectedMeter._id);
    if (this.route.snapshot.params['id']!== undefined) {

      this.meterService.selectedMeter._id = this.route.snapshot.params['id'];
      this.meterService.selectedMeter.id = this.meterForm.value.id;
      this.meterService.selectedMeter.name = this.meterForm.value.name;
      this.meterService.selectedMeter.location = this.meterForm.value.location;

      this.meterService.updateValue(this.meterService.selectedMeter)
        .subscribe(
          (res) => {
          //this.meterService.selectedMeter = res as MeterInfoModel;
          console.log(res);
          this.router.navigate(['/meters', 'list']);
          },
          (err)=>{console.log(err);}
        );
    } else {
      // console.log(this.route.snapshot.params);
      // console.log(
      //   this.meterForm.value.id,
      //   this.meterForm.value.name,
      //   this.meterForm.value.location
      // );
      this.meterService.selectedMeter.id = this.meterForm.value.id;
      this.meterService.selectedMeter.name = this.meterForm.value.name;
      this.meterService.selectedMeter.location = this.meterForm.value.location;

      this.meterService.postValue(this.meterService.selectedMeter).subscribe(
        (res) => {
          console.log('Inserted Sucessfully : ' + JSON.stringify(res));
          this.meterForm.reset();
          this.router.navigate(['/meters', 'list']);
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }


  public onClickCancel(){
    this.router.navigate(['/meters','list']);
  }


}
