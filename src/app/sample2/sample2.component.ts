import { Component, OnInit } from '@angular/core';
// import {FixedSizeVirtualScrollStrategy, VIRTUAL_SCROLL_STRATEGY} from '@angular/cdk/scrolling';
import { Item } from '../app.component';

// export class CustomVirtualScrollStrategy extends FixedSizeVirtualScrollStrategy {
//   constructor() {
//     super(48, 48*100, 48*1000);
//   }
// }
@Component({
  selector: 'app-sample2',
  templateUrl: './sample2.component.html',
  // providers: [{provide: VIRTUAL_SCROLL_STRATEGY, useClass: CustomVirtualScrollStrategy}],
})
export class Sample2Component implements OnInit {
  title = 'mat-select-many-opt';
  selectedValue = "";
  items: Item[] = [] ;

  ngOnInit(): void {
    let tmp = [];
    for(let i = 0 ; i < 10000; i++){
      tmp.push({value: "text - "+(i+1), viewValue: "text - " + (i+1), isShow: true})
    }
    this.items = tmp;
  }

  clearData() {
    this.items = [];
  }
  randomData(){
    let tmp = [];
    for(let i = 0 ; i < 10000; i++){
      tmp.push({value: "text - "+(i+1), viewValue: "text - " + (i+1), isShow: true})
    }
    this.items = [];
    this.items = tmp;
  }

  renderVirtual(){
    console.log("render virtual")
  }
}
