import {Component, OnInit} from 'angular2/core';

import {LoginComponent} from './login.component';
import {CurrentUser} from './models/theModels';



@Component({
  selector: 'my-app',
  template: `
    <my-login (userLoggedIn)=updateUser($event) [ngClass]="{xinvisible:isAuthed}"></my-login>
	<div  [ngClass]="{xinvisible:!isAuthed}" class="container-fluid"> I know you, of course :)  </div>
  `,
  styles: [`
    .xinvisible { display:none};
  `],
  directives: [LoginComponent]
})


export class AppComponent implements OnInit {
  public title = 'Meanwhile in Anthonys galaxy...';
  appClass: string;
  loginClass: string;
  isAuthed: boolean;
  user: CurrentUser;

 //left here for educational purposes....
  constructor() { }

  ngOnInit() {
    this.user = new CurrentUser();
    this.user.extId = "";
    if (localStorage.getItem('user') != null) {
      this.user = JSON.parse(localStorage.getItem('user'));
      console.log(this.user.extId);
      this.isAuthed = true;
    }
    else {
      this.isAuthed = false;
    }
  }
  
  updateUser(usr: CurrentUser) {
    this.user = usr;
    this.isAuthed = true;
  }


}

