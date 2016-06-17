import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';

import {Observable} from "rxjs/Observable";


@Injectable()
export class DungeonService {	
	
	constructor(private http:Http) {
	 console.log("dungeon service is born");
	}
	
    getDungeon() {return  this.http.get('http://adv1.azurewebsites.net/api/dungeons').map((res:any) =>res.json());  }
  

}
