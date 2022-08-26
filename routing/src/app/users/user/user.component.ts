import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {
  user: {id: number, name: string};
  paramsSubscription: Subscription;

  constructor(private route: ActivatedRoute) { }
  
  ngOnInit() {
    this.user = {
      id: this.route.snapshot.params['id'],
      name:this.route.snapshot.params['name']
    };

    //Note that params is an observable. Meaning it fires whenever the
    //route parameters change
    this.paramsSubscription = this.route.params
      .subscribe(
        (p: Params) => {
          this.user.id = p['id'];
          this.user.name = p['name'];
        }
      );
  }


  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }

}
