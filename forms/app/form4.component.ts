import {Component} from '@angular/core';
import { FORM_PROVIDERS } from '@angular/common';
import { FormBuilder, Validators } from '@angular/common';
import { ControlMessages } from './control-messages.component';
import { ValidationService } from './validation.service';

@Component({
    selector: 'my-form4',
    templateUrl: 'app/form4.component.html', 
    directives: [ControlMessages],
styles: [
        `
        .ng-invalid { border-left:5px solid #f00;}
        .ng-valid[required] { border-left:5px solid #0f0;}
  `]
})


export class Form4Component {
    userForm:any;
    formdata : string  = "";
 
 constructor( private formBuilder : FormBuilder) {
     
     this.userForm = this.formBuilder.group({
        'name': ['', Validators.required],
        'description': ['', Validators.nullValidator],
        'contact':this.formBuilder.group ({
            'email1' : ['', Validators.required], 
            'email2' : ['', Validators.nullValidator], 
            'telephone' : ['', Validators.nullValidator], 
            'telephone2' : ['', Validators.nullValidator]       
        })
            
        
    });
 }
 
    onSubmit() {
        if (this.userForm.dirty && this.userForm.valid) {
            this.formdata = JSON.stringify(this.userForm.value);
            return false;
        }
    }
}