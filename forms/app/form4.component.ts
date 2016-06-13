import {Component} from '@angular/core';


@Component({
    selector: 'my-form4',
    templateUrl: 'app/form4.component.html', 
styles: [
        `
        .ng-invalid { border-left:5px solid #f00;}
        .ng-valid[required] { border-left:5px solid #0f0;}
 
  `]
})


export class Form4Component {
 formdata : string  = "";
 
    onSubmit(v:any) {
        this.formdata = JSON.stringify(v);
        return false;
    }
}