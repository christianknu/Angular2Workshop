import {Component} from '@angular/core';

@Component({
    selector: 'my-form1',
    templateUrl: 'app/form1.component.html'

})


export class Form1Component {
    onSubmit(v:any) {
        alert(JSON.stringify(v));
    }
}

