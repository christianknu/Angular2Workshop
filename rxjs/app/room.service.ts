import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';

import {Observable} from "rxjs/Observable";


@Injectable()
export class RoomService {	
	
	constructor(private http:Http) {
	 console.log("room service is born");
	}
	
    getRooms() {return  this.http.get('http://adv1.azurewebsites.net/api/rooms').map((res:any) =>res.json());  }
  

}
