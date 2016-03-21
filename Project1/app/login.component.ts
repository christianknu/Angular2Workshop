import {Component, OnInit, Output, EventEmitter} from 'angular2/core';

import { iCurrentUser}  from './currentuser';

@Component({
    selector: 'my-login',
    template: `
	<div class="container bongo">
        <div class="col-md-6 .col-md-offset-3 centered">
            <h3 class="form-signin-heading">{{title}}</h3>
            <label for="inputEmail" class="sr-only">Email address</label>
            <input type="text" class="form-control" placeholder="id"  [(ngModel)]="user.extId" required autofocus />
            <button class="btn btn-lg btn-primary btn-block" (click)="validateUser()" type="submit">Sign in</button>
            <div [ngClass]="{xinvisible:user.isValid}">{{user.validationError}}</div>
        </div>
    </div>
  `,
    styles: [
        `
        .xinvisible { display:none};
        .bongo { padding:200px;}
  `],
})

export class LoginComponent implements OnInit {
    @Output() userLoggedIn: EventEmitter<any> = new EventEmitter();
    public title = 'Login';

    user: iCurrentUser;

    constructor() { }

    ngOnInit() {
        this.user  = {isAuthed:false, isValid:false, extId:""}
    }

    validateUser() {
        // This validation really rocks.... :o)
        if (this.user.extId.length < 6) {
            this.user.validationError = "OMG! Username is to short, must be 6 characters"
            this.user.isValid = false;
        }
        else {
            this.user.isAuthed = true;
              this.userLoggedIn.emit(this.user);
        }
      

    }

}