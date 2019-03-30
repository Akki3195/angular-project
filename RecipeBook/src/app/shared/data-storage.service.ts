import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RecipesService } from '../recipes/recipes.service';
import { Recipe } from '../recipes/Recipe.model';
import 'rxjs/Rx';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class DataStoragService {

    constructor(private http: Http, 
                private recipeService: RecipesService,
                private authService: AuthService) {
    }

    storeRecipes() {
        const token = this.authService.getToken();
        return this.http.put('https://ng-recipe-book-ccf13.firebaseio.com/recipes.json?auth='+token, this.recipeService.getRecipes());
    }

    getRecipes() {
        const token = this.authService.getToken();
        
        this.http.get('https://ng-recipe-book-ccf13.firebaseio.com/recipes.json?auth='+token)
            .map(
                (response: Response) => {
                    const recipes = response.json();
                    console.log(recipes);
                    for(let recipe of recipes){
                        if(!recipe['ingredients']){
                            recipe['ingredients'] = [];
                        }
                    }
                    return recipes;
                }
            )
            .subscribe(
                (recipes: Recipe[]) => {
                    this.recipeService.setRecipes(recipes);
                });
    }

}