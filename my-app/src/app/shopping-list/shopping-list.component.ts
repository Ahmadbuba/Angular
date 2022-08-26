import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoggingService } from '../logging.service';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[] = [];
  private igChangedSub: Subscription;

  constructor(
    private slService: ShoppingListService,
    private loggingService: LoggingService
    ) { }

  ngOnInit() {
    this.ingredients = this.slService.getIngredients();
    this.igChangedSub = this.slService.ingredientsChanged
      .subscribe(
        (igs: Ingredient[]) => {
          this.ingredients = igs
        }
      );

      this.loggingService.printlog('Hello from ShoppingListComponent ngOnInit');
  }


  onEditItem(index: number) {
    this.slService.startedEditing.next(index);
  }

  ngOnDestroy() {
    this.igChangedSub.unsubscribe();
  }

}
