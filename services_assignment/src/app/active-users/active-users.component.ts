import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CounterService } from '../counter.service';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-active-users',
  templateUrl: './active-users.component.html',
  styleUrls: ['./active-users.component.scss']
})
export class ActiveUsersComponent implements OnInit {
  users: string[];
  @Output() activeToInactive = new EventEmitter<number>();
  count = 0;


  constructor(
    private userService: UsersService,
    private counterService: CounterService
    ) { }

  ngOnInit() {
    this.users = this.userService.activeUsers;
  }

  onSetToInactive(id: number) {
    this.userService.setToInactive(id);
    this.activeToInactive.emit(this.count++);
  }

}
