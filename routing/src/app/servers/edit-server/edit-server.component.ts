import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ServersService } from '../servers.service';
import { CanComponentDeactivate } from './can-deactivate-guard.service';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.scss']
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  allowEdit = false;
  changesSaved = false;
  serverID: number;

  constructor(
    private serversService: ServersService,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit() {
    console.log(this.route.snapshot.queryParams);
    console.log(this.route.snapshot.fragment);
    /**The observable version of it, the code above. this allows us to react on changes while the above is static, it cannot react to changes */
    this.route.queryParams.subscribe(
      (qp: Params) => {
        this.allowEdit = qp['allowEdit'] === '1' ? true: false ;
      }
    );
    this.route.fragment.subscribe();
    this.serverID= +this.route.snapshot.params['id'];
    this.server = this.serversService.getServer(this.serverID);
    // Subscribe route params to update the id if params change
    this.route.queryParams.subscribe(
      (p: Params) => {
        this.serverID =  +p['id'];
      }
    );
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
    this.changesSaved = true;
    this.router.navigate(['../'], {relativeTo: this.route})
  }

  canDeactivate(): boolean | Promise<boolean> | Observable<boolean> {
    if(!this.allowEdit) {
      return true;
    }
    if((this.serverName !== this.server.name || this.serverStatus !== this.server.status) && !this.changesSaved) {
      return confirm('Do you want to discard the changes?');
    } else {
      return true;
    }
  }

}
