import { MeterDataModel } from "./meterdata.model";

export class MeterInfoModel{
    public _id?:string;
    public id:string;
    public name: string;
    public location: string;
    //Added
    //  public meterData?:MeterDataModel[];

    constructor (info:MeterInfoModel){
        this.id = info.id?info.id:'';
        this.name = info.name?info.name :'';
        this.location = info.location?info.location:'';
        //Added
        // this.meterData= info.meterData?info.meterData:[];
    }
}