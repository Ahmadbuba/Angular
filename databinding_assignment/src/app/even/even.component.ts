import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-even',
  templateUrl: './even.component.html',
  styleUrls: ['./even.component.scss']
})
export class EvenComponent implements OnInit {
@ViewChild('para', {static: true}) p: ElementRef;
@Input() evenNum:number;


  constructor() { }

  ngOnInit(): void {
  }

}
