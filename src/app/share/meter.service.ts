import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { MeterDataModel } from "./meterdata.model";
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/toPromise';
import { MeterInfoModel } from "./meterinfo.model";

@Injectable({providedIn:'root'})

export class MeterService{
   public selectedMeterData:MeterDataModel={unit:'',unitvalue:'',datetime:''};
   public meterDataInfos:MeterDataModel[] =[];
   public selectedMeter:MeterInfoModel={id:'',name:'',location:''};
   public minfos:MeterInfoModel[]=[];
    constructor(private http: HttpClient,) { }


  public postValue(meter : MeterInfoModel):Observable<any>{
    return this.http.post<any>(environment.baseUrl+'add', meter);
  }

  public getMeterList():Observable<any> {
    return this.http.get<any>(environment.baseUrl+'list');
  }
  public getMeter(meterid:string):Observable<any>{
    return  this.http.get<any>(environment.baseUrl+`fetch/${meterid}`);
  }

  public updateValue(meter:MeterInfoModel){
    return this.http.put(environment.baseUrl+`edit/${meter._id}`,meter,{responseType: 'text'});
  }

  public postMeterData(meterid:string){
    return this.http.put(environment.baseUrl+`data/add/${meterid}`,this.selectedMeterData,{responseType: 'text'});
  }

    public removeMeterData(meterdataid:string):Observable<any>{
    return this.http.put<any>(environment.baseUrl+`data/delete/${meterdataid}`,{responseType: 'text'});
  }
  public editMeterData(dataid:string){
    return this.http.put(environment.baseUrl+`data/edit/${dataid}`,this.selectedMeterData);
  }

  public uploadFile(data:FormData){
    return this.http.post<any>(environment.baseUrl+'upload',data);
  }



}
