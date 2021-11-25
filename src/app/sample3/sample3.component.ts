import { MatOption } from '@angular/material/core';
import { ScrollDispatcher, CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { ChangeDetectorRef, Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { filter } from 'rxjs/operators';
import { Item } from '../app.component';

@Component({
  selector: 'app-sample3',
  templateUrl: './sample3.component.html',
})
export class Sample3Component implements OnInit {
  title = 'mat-select-many-opt';
  selectedValue: any = [];
  items: Item[] = [] ;

  filterStr = "";
  filterItems: Item[] = [];

  @ViewChild(CdkVirtualScrollViewport, {static: true}) cdkVirtualScrollViewport!: CdkVirtualScrollViewport;
  @ViewChildren(MatOption) options!: QueryList<MatOption>;

  constructor(private cd: ChangeDetectorRef, readonly sd: ScrollDispatcher){
    this.sd
      .scrolled()
      .pipe(filter(scrollable => this.cdkVirtualScrollViewport === scrollable))
      .subscribe(() => {
        let needUpdate = false;

        this.options.forEach(option => {
          const selected = this.selectedValue.includes(option.value);

          if (selected && !option.selected) {
            option.select();
            needUpdate = true;
          } else if (!selected && option.selected) {
            option.deselect();
            needUpdate = true;
          }
        });

        if (needUpdate) {
          this.cd.detectChanges();
        }
      });
  }

  @ViewChild(MatSelect) select!: MatSelect;

  ngOnInit(): void {
    let tmp = [];
    for(let i = 0 ; i < 10000; i++){
      tmp.push({value: ""+(i+1), viewValue: "text - " + (i+1), isShow: true})
    }
    this.items = tmp;
    this.filter();
  }

  clearData() {
    this.items = [];
  }
  randomData(){
    let tmp = [];
    for(let i = 0 ; i < 10000; i++){
      tmp.push({value: ""+(i+1), viewValue: "text - " + (i+1), isShow:true})
    }
    this.items = [];
    this.items = tmp;
    this.filter();
  }


  filter(){
    if(this.filterStr.trim() == "")
      this.filterItems = this.items;
    else
      this.filterItems = this.items.filter(v => v.viewValue.indexOf(this.filterStr.trim()) != -1);
  }

  onSelectOpened(){
    this.filterStr = "";
    this.filter();
  }
  onSelectClosed(){
    // this.select.value = this.selectedValue;
  }
  onSelectValueChange($event: any){
    console.log($event);
  }

  assignValue(v:any = 500){
  }
}
