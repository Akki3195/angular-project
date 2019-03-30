import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild("f") slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  // @ViewChild('inputName') inputNameRef: ElementRef;
  // @ViewChild('inputAmount') inputAmountRef: ElementRef;
  // @Output() newIngredient = new EventEmitter<Ingredient>();

  constructor(private slService: ShoppingListService) { }

  // onSelected(){
  //   const ingName  = this.inputNameRef.nativeElement.value;
  //   const ingNumber  = this.inputAmountRef.nativeElement.value;
  //   const ingredient = new Ingredient(ingName,ingNumber);
  //   this.newIngredient.emit(ingredient);
  //   this.slService.addIngredient(ingredient);
  // }

  ngOnInit() {
    
    this.subscription = this.slService.startedEditing
      .subscribe(
        (index: number) => {
          console.log("from delete button");
          this.editedItemIndex = index;
          this.editMode = true;
          this.editedItem = this.slService.getIngredient(index);
          this.slForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          });
        }
      );
  }

  onSubmit(form: NgForm) {
    console.log(form);
    const newIngredient = new Ingredient(form.value.name, form.value.amount);
    if(this.editMode){
      this.slService.updateIngredient(this.editedItemIndex,newIngredient);
    }
    else{
    this.slService.addIngredient(newIngredient);
    }
    this.editMode = false;
    form.reset();
  }

  onClear(){
    this.slForm.reset();
    this.editMode= false;
  }

  onDelete(){
    this.onClear();
    this.slService.deleteIngredient(this.editedItemIndex);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe;
  }


}
