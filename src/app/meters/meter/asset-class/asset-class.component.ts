import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MeterService } from 'src/app/share/meter.service';

@Component({
  selector: 'app-asset-class',
  templateUrl: './asset-class.component.html',
  styleUrls: ['./asset-class.component.css']
})
export class AssetClassComponent implements OnInit {

public uploadForm: FormGroup;
  public file;
  public stream;
  public header = [];
  constructor(private router: Router, private meterService: MeterService) {}

  ngOnInit(): void {
    this.uploadForm = new FormGroup({
      companyIdRdb: new FormControl('', Validators.required),
      facilityIdRdb: new FormControl('', Validators.required),
      assetClass: new FormControl('', Validators.required),
      csvFile: new FormControl('', Validators.required),
    });
  }

  public onSelectFile(event) {
    if (event.target.files.length > 0) {
      let readFile: File;
      readFile = this.file = event.target.files[0];

      //File reader method
      let reader: FileReader = new FileReader();
      reader.readAsText(readFile);
      reader.onload = (e) => {
        let csv: any = reader.result;
        let allTextLines = [];
        allTextLines = csv.split(/\r|\n|\r/);

        //Table Headings
        let headers = allTextLines[0].split(';');
        this.header = headers;
        // let data = headers;

        // for (let j = 0; j < headers.length; j++) {
        //   this.header.push(data[j]);
        // }
        // console.log('Headers : ',this.header);
        // console.log(readFile.stream());
        this.stream = reader.result;
      };
    }
  }

  public onSubmit() {
    const formData = new FormData();
    formData.append('companyId', this.uploadForm.value.companyIdRdb);
    formData.append('facilityId', this.uploadForm.value.facilityIdRdb);
    formData.append('assetClass', this.uploadForm.value.assetClass);
    formData.append('File', this.file);
    this.meterService.uploadFileAndData(formData).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
    // console.log(this.file);
  }

  public onClickCancel() {
    this.router.navigate(['/meters', 'list']);
  }


}
