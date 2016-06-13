import {Component} from '@angular/core';
//Does not seem to be needed, although always there in documentation ? 
//import {FORM_DIRECTIVES} from '@angular/common';


@Component({
    selector: 'my-form2',
    templateUrl: 'app/form2.component.html'
// directives: [FORM_DIRECTIVES]    Not needed ? 
})


export class Form2Component {
 formdata : string  = "";
    onSubmit(v:any) {
        this.formdata = JSON.stringify(v);
    }
}