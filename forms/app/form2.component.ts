import {Component} from '@angular/core';


@Component({
    selector: 'my-form2',
    templateUrl: 'app/form2.component.html'

})


export class Form2Component {
 formdata : string  = "";
    onSubmit(v:any) {
        this.formdata = JSON.stringify(v);
    }
}