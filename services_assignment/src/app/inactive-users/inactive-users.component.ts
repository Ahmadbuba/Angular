import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CounterService } from '../counter.service';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-inactive-users',
  templateUrl: './inactive-users.component.html',
  styleUrls: ['./inactive-users.component.scss']
})
export class InactiveUsersComponent implements OnInit {
  users: string[];
  @Output() inActiveToActive = new EventEmitter<number>();
  count = 0;
  

  constructor(
    private usersService: UsersService,
    private counterService: CounterService
    ) { }

  ngOnInit() {
    this.users = this.usersService.inactiveUsers
  }

  onSetToActive(id: number) {
    this.usersService.setToActive(id);
    this.inActiveToActive.emit(this.count++);
  }

}
