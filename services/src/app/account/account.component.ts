import { Component, Input, OnInit} from '@angular/core';
import { AccountService } from '../account.service';
import { LoggingService } from '../logging.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  // providers: [LoggingService]
})
export class AccountComponent implements OnInit {
  @Input() account: {name: string, status: string};
  @Input() id: number;
  

  constructor(
    private loggingService: LoggingService,
    private accountService: AccountService
    ) { }

  ngOnInit() {
  }

  onSetTo(status: string) {
    this.accountService.updateStatus(this.id, status)
    // this.loggingService.logStatusChange(status);
    this.accountService.statusUpdated.emit(status);
  }

}
