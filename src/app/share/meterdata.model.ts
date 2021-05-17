export class MeterDataModel{
    public _id?:string;
    public unit:string;
    public unitvalue:string;
    public datetime: string;

    constructor (info:MeterDataModel){
        this._id = info._id?info._id:'';
        this.unit = info.unit?info.unit:'';
        this.unitvalue = info.unitvalue?info.unitvalue :'';
        this.datetime = info.datetime?info.datetime:'';
    }
}