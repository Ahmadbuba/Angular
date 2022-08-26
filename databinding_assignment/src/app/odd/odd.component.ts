import { Component, ContentChild, ElementRef, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-odd',
  templateUrl: './odd.component.html',
  styleUrls: ['./odd.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class OddComponent implements OnInit {

  @Input()oddNum:number;

  constructor() { }

  ngOnInit() {
  }

}
