import {Component, OnInit} from '@angular/core';
import { FORM_PROVIDERS } from '@angular/common';
import { FormBuilder, Validators } from '@angular/common';
import { ControlMessages } from './control-messages.component';
import { ValidationService } from './validation.service';

@Component({
    selector: 'my-form5',
    templateUrl: 'app/form5.component.html', 
    directives: [ControlMessages],
styles: [
        `
        .ng-invalid { border-left:5px solid #f00;}
        .ng-valid[required] { border-left:5px solid #0f0;}
  `]
})


export class Form5Component implements OnInit {
    userForm:any;
    formdata : string  = "";
    eventEmitterData :string = "";
    cgroupData :string = "";
    email1Data :string = "";
    
    constructor( private formBuilder : FormBuilder) {
        
    }
        
    ngOnInit() {
        this.setForm();
    }
    
    setForm() {
        this.userForm = this.formBuilder.group({
            'name': ['', Validators.required],
            'description': ['', Validators.nullValidator],
            'contact':this.formBuilder.group ({
                'email1' : ['', Validators.compose([Validators.required, ValidationService.emailValidator])], 
                'email2' : ['', ValidationService.emptyOrEmailValidator], 
                'telephone' : ['', Validators.nullValidator], 
                'telephone2' : ['123', Validators.nullValidator]       
            }) 
        });       
        
        this.userForm.valueChanges.subscribe((value:string) => { this.eventEmitterData = JSON.stringify(value) }); 
         this.userForm.controls['contact'].valueChanges.subscribe((value:string) => { this.cgroupData = JSON.stringify(value) }); 
         this.userForm.controls['contact'].controls['email1'].valueChanges.subscribe((value:string) => { this.email1Data = JSON.stringify(value) }); 
    }
 
    onSubmit() {
        if (this.userForm.dirty && this.userForm.valid) {
            this.formdata = JSON.stringify(this.userForm.value);
            this.userForm.setPristine();
            this.userForm.setUntouched();
            this.setForm();
            
            return false;
        }
    }
}