import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent{
  title = 'mat-select-many-opt';
}

export interface Item {
  value: string;
  viewValue: string;
  isShow: boolean;
}
