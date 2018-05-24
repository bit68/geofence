import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the GeofencesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GeofencesProvider {

  constructor(public http: HttpClient) {
    console.log('Hello GeofencesProvider Provider');
  }

  load(){
    return this.http.get("http://hatwafar.bit68.com/all_geofence/")
  }

}
