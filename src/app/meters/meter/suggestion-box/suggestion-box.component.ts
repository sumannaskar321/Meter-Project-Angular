import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-suggestion-box',
  templateUrl: './suggestion-box.component.html',
  styleUrls: ['./suggestion-box.component.css'],
})
export class SuggestionBoxComponent implements OnInit {
  public value: string = '';
  public dataList = ['Ayan', 'Avantika', 'Babai', 'Bina', 'Subham'].sort();
  public showDataList: string[];
  public selectedOption: string;
  public position: number;
  public spacePosition: number;
  // public showList: boolean = false;
  constructor() {}

  ngOnInit(): void {}

  public onType(event: Event) {
    let trimmedValue = (<HTMLInputElement>event.target).value.trim();
    this.value = (<HTMLInputElement>event.target).value;
    if (
      (trimmedValue.startsWith('@') ||
        this.value.endsWith(' @') ||
        this.value.search(' @') !== -1) &&
      this.value.search('@ ') === -1
    ) {
      // this.showList = true;
      this.position = this.value.search('@');
      var afterPositionstr = this.value.slice(this.position + 1);
      this.spacePosition = afterPositionstr.search(' ');
      if (this.spacePosition !== -1) {
        var str = this.value.slice(
          this.position + 1,
          this.position + this.spacePosition + 1
        );
        this.showDataList = this.dataList.filter((data) => {
          return data.toLowerCase().startsWith(str.toLowerCase());
        });
      } else {
        this.showDataList = this.dataList.filter((data) => {
          return data.toLowerCase().startsWith(afterPositionstr.toLowerCase());
        });
      }
      // this.dummyDataList=suggestions.length>0?suggestions:this.dataList;
      // console.log(suggestions);
      // console.log('Position:',position,'\nlength: ',strlen);
    } else {
      this.showDataList = [];
      // this.showList = false;
      // console.log('No @');
    }
  }

  public onSelect(option: string) {
    this.selectedOption = option;
    // console.log(this.value.slice(0,this.position+1),this.value.slice(this.position+1));
    if (this.spacePosition !== -1) {
      this.value =
        this.value.slice(0, this.position) +
        option +
        this.value.slice(this.position + this.spacePosition + 1);
    } else {
      this.value = this.value.slice(0, this.position) + option;
    }

    this.showDataList = [];
    console.log(option);
  }
}
