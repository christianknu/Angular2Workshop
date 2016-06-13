import {Component} from '@angular/core';

@Component({
    selector: 'my-form1',
    templateUrl: 'app/form1.component.html'
})


export class Form1Component {
    formdata : string  = "";
    onSubmit(v:any) {
        this.formdata = JSON.stringify(v);
    }
}

