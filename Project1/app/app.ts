import {Component, OnInit} from '@angular/core';

import {LoginComponent} from './login.component';
import {iCurrentUser}  from './currentuser';
import {HangmanComponent} from './hangman.component';


@Component({
  selector: 'my-app',
  template: `<div class="container">
      <h2 class="form-signin-heading">{{title}}</h2>
   <my-login (userLoggedIn)=updateUser($event) *ngIf="!user.isAuthed" [parent]='title'></my-login>
  	<div *ngIf="user.isAuthed" class="container-fluid"> I know you, {{user.extId}} of course :)  </div>
    <my-hangman *ngIf="user.isAuthed"></my-hangman>
   </div>
  `,
  directives: [LoginComponent, HangmanComponent]
})


export class AppComponent implements OnInit {
  public title = 'Meanwhile in Anthonys galaxy...';
  appClass: string;
  loginClass: string;
  user: iCurrentUser;

  //left here for educational purposes....
  constructor() { }

  ngOnInit() {
    this.user  = {isAuthed:false, extId:""}
   
    if (localStorage.getItem('user') != null) {
      this.user = JSON.parse(localStorage.getItem('user'));
    }
  }

  updateUser(usr: iCurrentUser) {
    this.user = usr;
    localStorage.setItem("user", JSON.stringify(this.user));
  }

}


