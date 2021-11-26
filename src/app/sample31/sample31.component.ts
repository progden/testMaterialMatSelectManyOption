import { MatSelect } from '@angular/material/select';
import { Component, ViewChild, ViewChildren, QueryList, ChangeDetectorRef, OnInit, AfterViewInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { CdkVirtualScrollViewport, ScrollDispatcher } from "@angular/cdk/scrolling";
import { MatOption } from "@angular/material/core";
import { filter } from "rxjs/operators";

@Component({
  selector: 'app-sample31',
  templateUrl: './sample31.component.html',
  styleUrls: ['./sample31.component.sass'],
})
export class Sample31Component implements AfterViewInit{
  title = "test-proj";

  // toppings = new FormControl();
  toppingList: any[] = [];
  selected: any = [];

  @ViewChild(MatSelect) selectCtr!: MatSelect;
  @ViewChild(CdkVirtualScrollViewport, { static: true }) cdkVirtualScrollViewport!: CdkVirtualScrollViewport;

  multiSelectControl = new FormControl();

  @ViewChildren(MatOption) options!: QueryList<MatOption>;

  constructor(private cd: ChangeDetectorRef, readonly sd: ScrollDispatcher) {
    for (let i = 0; i < 100000; i++) {
      this.toppingList.push({ id: i, viewValue: "option-" + i, isShow: true});
    }
  }

  ngAfterViewInit(): void {
    this.sd
      .scrolled()
      .pipe(filter(scrollable => this.cdkVirtualScrollViewport === scrollable))
      .subscribe(() => {
        console.log("scrolled!!")
        let needUpdate = false;

        this.options.forEach(option => {
          const selected = this.selected.includes(option.value);

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

  foropen() {
    if(this.cdkVirtualScrollViewport && this.cdkVirtualScrollViewport.getDataLength() > 0)
      this.cdkVirtualScrollViewport.scrollToIndex(5);
  }

  openChange($event: boolean) {
    if ($event) {
      this.foropen();
      if(this.cdkVirtualScrollViewport)
      {
        if(this.cdkVirtualScrollViewport.getDataLength() > 0)
          this.cdkVirtualScrollViewport.scrollToIndex(0);
        this.cdkVirtualScrollViewport.checkViewportSize();
      }
    }
  }

  onSelectionChange(change: any): void {
    if (!change.isUserInput) {
      return;
    }
    const value = change.source.value;
    const idx = this.selected.indexOf(change.source.value);

    if (idx > -1) {
      this.selected.splice(idx, 1);
    } else {
      this.selected.push(value);
    }

    this.selectedStr = this.selected.map((v: { viewValue: any; }) => v.viewValue).join(", ");
  }

  selectedStr = "";

  selectShowList(){
    console.log("show select")
    this.selectCtr.toggle()
  }

  filterStr = "";
  onFilterKeyUp(){
    // this.toppingList.forEach(v => v.isShow = (this.filterStr.trim() == '' || v.viewValue.indexOf(this.filterStr.trim()) > -1))
  }
}
