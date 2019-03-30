import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../Recipe.model';
import { RecipesService } from '../recipes.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit, OnDestroy {
  // @Output() recipeWasSelected = new EventEmitter<Recipe>();
  recipes: Recipe[];
  subscription: Subscription;

  // recipes: Recipe[] = [
  //   new Recipe('A test Recipe','This is simply a test','https://c.pxhere.com/photos/8b/0f/food_meat_recipe_power_pork_dishes-604134.jpg!d'),
  //   new Recipe('Panner','This is panner dish','https://c.pxhere.com/photos/8b/0f/food_meat_recipe_power_pork_dishes-604134.jpg!d'),
  //   new Recipe('Chicken','This is Chiken dish','https://c.pxhere.com/photos/8b/0f/food_meat_recipe_power_pork_dishes-604134.jpg!d')

  // ];
  constructor(private recipesService: RecipesService,
              private router: Router,
              private route: ActivatedRoute) { }

  // onRecipeSelected(rcp: Recipe){
  //   this.recipeWasSelected.emit(rcp);
  // }

  ngOnInit() {
    this.subscription = this.recipesService.recipeChanged
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipes = recipes; 
        }
      );
    this.recipes = this.recipesService.getRecipes();
  }

  onNewRecipe(){
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
