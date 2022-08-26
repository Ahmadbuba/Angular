import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.scss']
})
export class GameControlComponent implements OnInit {

  @Output() num = new EventEmitter<number>();
  interval:any;
  count = 0;

  constructor() { }

  ngOnInit(): void {
  }

  onStartGame() {
    this.interval = setInterval(()=> {
      this.num.emit(this.count + 1);
      this.count++;
    },1000)
    
  }

  onStopGame() {
    clearInterval(this.interval);
  }
}
