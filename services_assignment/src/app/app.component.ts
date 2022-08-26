import { Component, OnInit } from '@angular/core';
import { CounterService } from './counter.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {
  
  inActiveToactive:number = 0;
  activeToInactive:number = 0;

  setInActiveToActive (data:number) {
    this.inActiveToactive ++;
  }

  setActiveToInactive (data:number) {
    this.activeToInactive ++;
  }
  

}



