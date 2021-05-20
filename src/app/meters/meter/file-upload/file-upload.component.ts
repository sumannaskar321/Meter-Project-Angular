import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MeterService } from 'src/app/share/meter.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css'],
})
export class FileUploadComponent implements OnInit {
  public uploadForm: FormGroup;
  public file;
  public header = [];
  constructor(private router: Router, private meterService: MeterService) {}

  ngOnInit(): void {
    this.uploadForm = new FormGroup({
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
        this.header=headers;
        // let data = headers;

        // for (let j = 0; j < headers.length; j++) {
        //   this.header.push(data[j]);
        // }
        console.log('Headers : ',this.header);
      };
    }
  }


  public onSubmit() {
    const formData = new FormData();
    formData.append('file', this.file);
    this.meterService.uploadFile(formData).subscribe(
      (res) => {
        console.log('file uploaded');
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
