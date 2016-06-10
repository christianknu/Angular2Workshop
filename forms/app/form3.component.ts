import {Component} from '@angular/core';

@Component({
    selector: 'my-form3',
    templateUrl: 'app/form3.component.html'

})


export class Form3Component {
    onSubmit(v:any) {
        alert(JSON.stringify(v));
    }
}