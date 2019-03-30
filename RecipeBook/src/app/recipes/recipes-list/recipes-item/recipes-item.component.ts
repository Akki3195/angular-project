import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../../Recipe.model';
import { RecipesService } from '../../recipes.service';

@Component({
  selector: 'app-recipes-item',
  templateUrl: './recipes-item.component.html',
  styleUrls: ['./recipes-item.component.css']
})
export class RecipesItemComponent implements OnInit {
  @Input() recipe: Recipe;
  @Input() index: number;
  
  // @Output() selectedRecipe = new EventEmitter<void>();

  constructor(private recipesService: RecipesService) { 
  }

  // onSelected(){
    
  //   // this.selectedRecipe.emit();
  //   this.recipesService.recipeSelected.emit(this.recipe);
  // }
  ngOnInit() {
    
  }

}
