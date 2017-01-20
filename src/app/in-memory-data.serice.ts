import {Issue} from './issue';
import {Stop} from './stop';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class MockService{
    issues:Issue[] = [
        {id:1,name:'dziura', description:'w oponie', bus_id:12, solved:false},
        {id:2,name:'szpara', description:'w drzwiach', bus_id:13, solved:true},
    ]
    // stops:Stop[]= [
    //     {name:'Wroclaw'},
    //     {name:'Poznan'},
    //     {name:'Gdansk'}
    // ]
    getIssues():Issue[]{
        return this.issues;
    }
    getIssue(busID:number):Issue[]{
      return this.getIssues()
      .filter(function(issue){
          return issue.bus_id ===busID
      });
    }
    
    // getStops():Stop[]{
    //     return this.stops;
    // }
}