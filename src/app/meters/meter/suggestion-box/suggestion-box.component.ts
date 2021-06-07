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
  public caretPositon: number;
  public templetVar: HTMLInputElement;
  // public showList: boolean = false;
  constructor() {}

  ngOnInit(): void {}

  public onType(tepletVar: HTMLInputElement) {
    console.log(
      'Value: ',
      tepletVar.value,
      ' Caret position:',
      tepletVar.selectionStart
    );
    this.templetVar = tepletVar;
    this.value = tepletVar.value;
    this.caretPositon = tepletVar.selectionStart;

    if (this.caretPositon > 0) {
      // console.log(this.value.slice(caretPositon-2,caretPositon));
      var leftTwoPosition = this.value.slice(
        this.caretPositon - 2,
        this.caretPositon
      );

      // @ At the begining
      // '||' @ In the middle of text or At end position
      if (
        (this.caretPositon === 1 &&
        this.value.charAt(this.caretPositon - 1) === '@') 
        || leftTwoPosition === ' @'
      ) {
        this.showDataList = this.dataList;
      }
      // "@ " for hide/discard the list
      else if (leftTwoPosition === '@ ' || leftTwoPosition === '@@') {
        this.showDataList = [];
      } 
      // If there is any @ present at left string of caret position
      else if(this.value.slice(0, this.caretPositon).search('@') !== -1)
      {
        let i: number = this.caretPositon;
        while (i >= 0) {
          if (this.value.charAt(i) === '@') {
            break;
          }
          i--;
        }

        // console.log('+++++print =', this.value.slice(i + 1, this.caretPositon));
        if (!this.value.slice(i, this.caretPositon).startsWith('@ ')) {
          this.showDataList = this.dataList.filter((data) => {
            // console.log('+++entered');
            return data
              .toLowerCase()
              .startsWith(
                this.value.slice(i + 1, this.caretPositon).toLowerCase()
              );
          });
        } 
        else {
          this.showDataList = [];
        }
      }
      else {
        this.showDataList = [];
      }
    }//END if 
    else {
      this.showDataList = [];
    }
  }//END onType Function

  public onSelect(option: string) {
    var afterCaretStr = this.value.slice(this.caretPositon);

    let i: number = this.caretPositon;
    while (i >= 0) {
      i--;
      if (this.value.charAt(i) === '@') {
        break;
      }
    }

    if (afterCaretStr.length > 0) {
      // For cut one extra space
      var space: string = 
        this.value.charAt(this.caretPositon) === ' ' ? '' : ' ';
      this.value = this.value.slice(0, i + 1) + option + space +
        this.value.slice(this.caretPositon);

      //this line set the caret position at the string
      this.caretPositon =
        (this.value.slice(0, i + 1) + option + space).length +
        (space.length > 0 ? 0 : 1);

      if (this.templetVar.setSelectionRange) {
        setTimeout(() => {
          this.templetVar.focus();
          this.templetVar.setSelectionRange(
            this.caretPositon,
            this.caretPositon
          );
        }, 0);
      }
    } 
    else {
      this.value = this.value.slice(0, i + 1) +option + ' ';
        
      //this line set the caret position at the end of the string
      this.caretPositon = this.value.length//str.length;
      //this line does the focus at end position of the string
      this.templetVar.focus();
    }

    //that trim part must be done on submit/send button
    // this.value = str.trim();
    console.log('Value: ', this.value, ' Caret position:', this.caretPositon);
    this.showDataList = [];
    //this line does the focus at end position of the string
    // this.tepletVar.focus();
  }// END onSelect Function


}

//problem
// Have to fix inside onSelect()
// 1. `hello @name'   'bye` -> limit qouted space to one space (solved halfway)
// 2. After caret str.length>0 caret position should before str not in the end (solved)

// public onSelect(option: string) {
//   // console.log(this.value.slice(0,this.position+1),this.value.slice(this.position+1));
//   if (this.spacePosition !== -1) {
//     this.value =
//       this.value.slice(0, this.position) +
//       option +
//       this.value.slice(this.position + this.spacePosition + 1);
//   } else {
//     this.value = this.value.slice(0, this.position) + option;
//   }

//   this.showDataList = [];
//   console.log(option);
// }

// let trimmedValue = (<HTMLInputElement>event.target).value.trim();
//     this.value = (<HTMLInputElement>event.target).value;
//     if (
//       (trimmedValue.startsWith('@') ||
//         this.value.endsWith(' @') ||
//         this.value.search(' @') !== -1) &&
//       this.value.search('@ ') === -1
//     ) {
//       // this.showList = true;
//       this.position = this.value.search('@');
//       var afterPositionstr = this.value.slice(this.position + 1);
//       this.spacePosition = afterPositionstr.search(' ');
//       if (this.spacePosition !== -1) {
//         var str = this.value.slice(
//           this.position + 1,
//           this.position + this.spacePosition + 1
//         );
//         this.showDataList = this.dataList.filter((data) => {
//           return data.toLowerCase().startsWith(str.toLowerCase());
//         });
//       } else {
//         this.showDataList = this.dataList.filter((data) => {
//           return data.toLowerCase().startsWith(afterPositionstr.toLowerCase());
//         });
//       }
//       // this.dummyDataList=suggestions.length>0?suggestions:this.dataList;
//       // console.log(suggestions);
//       // console.log('Position:',position,'\nlength: ',strlen);
//     } else {
//       this.showDataList = [];
//       // this.showList = false;
//       // console.log('No @');
//     }
