import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  holderEven = [];
  holderOdd = [];

  addNum(digit: number) {
    digit % 2 == 0 ? this.holderEven.push(digit):this.holderOdd.push(digit);
  }
}

