import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { MeterService } from 'src/app/share/meter.service';
import { MeterInfoModel } from 'src/app/share/meterinfo.model';

@Component({
  selector: 'app-meter',
  templateUrl: './meter.component.html',
  styleUrls: ['./meter.component.css'],
})
export class MeterComponent implements OnInit {
  //refreshlist =new BehaviorSubject<boolean>(true);
  public showSpinner:boolean;
  constructor(private router: Router,public mService: MeterService,private route:ActivatedRoute) {
  }

  ngOnInit(): void {
    this.showSpinner=true;
    //this.refreshlist.pipe(switchMap(_=>this.refreshEmployeeList()))
    this.refreshEmployeeList();
  }

  refreshEmployeeList() {
    this.mService.getMeterList().subscribe((res) => {
      this.mService.minfos = res as MeterInfoModel[];
      this.showSpinner=false;
    });
  } 
  public onClickAddMeter() {
    //console.log(this.router.url)
    this.router.navigate(['/meters', 'add']);
  }

  public onClickEdit(id:string) {
    //this.mService.getMeter(id);
    this.router.navigate(['/meters', 'edit',id]);
  }
  public onClickAddData(id:string) {
    this.router.navigate(['/meters','data','list',id]);
  }
  public onClickDashboard(id:string){
    this.router.navigate(['/meters','data','dashboard',id]);
  }
  public onClickGlobalDashboard(){
    this.router.navigate(['/meters','data','dashboard']);
  }
}
