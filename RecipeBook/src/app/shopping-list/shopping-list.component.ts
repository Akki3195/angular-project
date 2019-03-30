import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  // ingredients: Ingredient[] = [
  //   new Ingredient('Apple',5),
  //   new Ingredient('Tomato',19)
  // ];
  ingredients: Ingredient[] = [];
  private subscription: Subscription;

  constructor(private shoppingListService: ShoppingListService) { }

  // onAdding(newIngredient: Ingredient) {
  //   // console.log("from shopping list "+newIngredient);
  //   // this.ingredients.push(newIngredient);

  // }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getShoppingList();
    this.subscription = this.shoppingListService.ingredientsChanged.subscribe(
      (ingredientsList: Ingredient[]) =>
      {
        this.ingredients = ingredientsList;
      }
    );
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  onEditItem(index:number){
    this.shoppingListService.startedEditing.next(index);
  }
}
