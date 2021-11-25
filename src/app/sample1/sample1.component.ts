import { Component, OnInit } from '@angular/core';
import { Item } from '../app.component';

@Component({
  selector: 'app-sample1',
  templateUrl: './sample1.component.html',
})
export class Sample1Component implements OnInit {
  title = 'mat-select-many-opt';
  selectedValue = "";
  items: Item[] = [] ;

  ngOnInit(): void {
    for(let i = 0 ; i < 10000; i++){
      this.items.push({value: "text - "+(i+1), viewValue: "text - " + (i+1), isShow: true})
    }
  }

  clearData() {
    this.items = [];
  }
  randomData(){
    this.items = [];
    for(let i = 0 ; i < 10000; i++){
      this.items.push({value: "text - "+(i+1), viewValue: "text - " + (i+1), isShow: true})
    }
  }
}
