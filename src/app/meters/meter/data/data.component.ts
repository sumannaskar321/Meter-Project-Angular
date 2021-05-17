import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MeterService } from 'src/app/share/meter.service';
import { MeterDataModel } from 'src/app/share/meterdata.model';
import { MeterInfoModel } from 'src/app/share/meterinfo.model';
// import { MeterDataService } from 'src/app/share/meterdata.service';
// import { MeterInfoModel } from 'src/app/share/meterinfo.model';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css'],
  providers:[MeterService]
})
export class DataComponent implements OnInit {
public showSpinner:boolean = true; 
  constructor(private router:Router,
    private route:ActivatedRoute,
    public meterService:MeterService
    ) { }

  ngOnInit(): void {
    this.refreshDataList();
  }
  public refreshDataList(){
    this.meterService.getMeter( this.route.snapshot.params['id'])
    .subscribe(
      res=>{
        // console.log(res.data);
        this.meterService.meterDataInfos = res.data as MeterDataModel[];
        console.log(this.meterService.meterDataInfos);
        this.showSpinner=false;
      },
      err=>{
        console.log(err);
      }
    );
  }

  public onClickBack(){
    this.router.navigate(['/meters','list']);
  }

  public onClickAdd(){
    this.router.navigate(['/meters','data','add',this.route.snapshot.params['id']]);
  }

  public onClickEdit(meterDataId:string){
    this.router.navigate(['/meters','data','edit',this.route.snapshot.params['id'],meterDataId]);
  }

  public onClickDelete(meterDataId:string){
    this.showSpinner=true;
    console.log(meterDataId);
    this.meterService.removeMeterData(meterDataId).subscribe(
      res=>{
        // console.log(res);
        this.refreshDataList();
        // this.router.navigate(['/meters','data','list',this.route.snapshot.params['id']]);
      },
      err=>{console.log(err);}
      );
    
  }

}
