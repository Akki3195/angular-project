import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../Recipe.model';
import { RecipesService } from '../recipes.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.css']
})
export class RecipesDetailComponent implements OnInit {
  // @Input() recipeDetail: Recipe;
  id: number;
  recipeDetail: Recipe;

  constructor(private recipesService: RecipesService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    // console.log(this.recipeDetail);
    const id = this.route.snapshot.params['id'];
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.recipeDetail = this.recipesService.getRecipe(this.id);
        }
      );
  }

  onAddToShoppingList() {
    this.recipesService.addIngredientToShoppingList(this.recipeDetail.ingredients);
  }

  onEditRecipe(){
    this.router.navigate(['edit'], {relativeTo: this.route});
    // this.router.navigate(['../',this.id,'edit'], {relativeTo: this.route});
  }

  onDeleteRecipe(){
    this.recipesService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }

}
