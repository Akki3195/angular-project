import { NgModule } from '@angular/core';
import { HeaderComponent } from './Header/header.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../shopping-list/app-routing.module';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { RecipesService } from '../recipes/recipes.service';
import { DataStoragService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';

@NgModule({
    declarations: [
        HeaderComponent,
        HomeComponent
    ],
    imports: [
        SharedModule,
        AppRoutingModule
    ],
    exports: [
        AppRoutingModule ,
        HeaderComponent
    ],
    providers:[
        ShoppingListService,
        RecipesService,
        DataStoragService,
        AuthService
    ]

})
export class CoreModule{

}