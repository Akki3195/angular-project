import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'ShoppingAndBookStore';
  loadedFeature:string = "Recipe";

  onNavigated(feature:string){
    this.loadedFeature=feature;
  }

  ngOnInit(){
    firebase.initializeApp({
      apiKey: "AIzaSyBK3hhrJLlEA556MplVQdgsoP1AzgWxZmA",
      authDomain: "ng-recipe-book-ccf13.firebaseapp.com"
    });
  }
}
