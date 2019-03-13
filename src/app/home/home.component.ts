import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public showPage1 = true;
  public showPage2 = false;
  public showPage3 = false;

  items: any = [`<<`, '1', '2', '3', `>>`];
  constructor() { }

  ngOnInit() {
  }
  getValue(value: string) {
    console.log(value);
    if (value === '<<') {
      this.showPage1 = true;
      this.showPage2 = false;
      this.showPage3 = false;
      console.log(this.showPage1);
    } if (value === '1') {
      this.showPage1 = true;
      this.showPage2 = false;
      this.showPage3 = false;
      console.log(this.showPage1);
    } if (value === '2') {
      this.showPage1 = false;
      this.showPage2 = true;
      this.showPage3 = false;
      console.log(this.showPage2);
    } if (value === '3') {
      this.showPage1 = false;
      this.showPage2 = false;
      this.showPage3 = true;
      console.log(this.showPage3);
    } if (value === '>>') {
      this.showPage1 = false;
      this.showPage2 = false;
      this.showPage3 = true;
      console.log(this.showPage3);
    }
  }
  
}
