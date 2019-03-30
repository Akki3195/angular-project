import { Component, EventEmitter, Output } from '@angular/core';
import { Response } from '@angular/http';
import { AuthService } from 'src/app/auth/auth.service';
import { DataStoragService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent{
//   @Output() featureSelected  = new EventEmitter<string>();

// onSelect(feature:string){
//   this.featureSelected.emit(feature);
// }

constructor(private dataStorageService: DataStoragService,
            private authService: AuthService){
}


onSave(){
  this.dataStorageService.storeRecipes()
    .subscribe(
      (response: Response) => { console.log(response)}
    );
}

fetchData(){
  this.dataStorageService.getRecipes();
}

onLogout(){
  this.authService.logout();
}

isAuthenticated() {
  return this.authService.isAuthenticated();
}
}