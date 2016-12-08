import {Issue} from './issue';
import {Stop} from './stop';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class MockService{
    issues:Issue[] = [
        {name:'dziura', description:'w oponie', busID:12, solved:false},
        {name:'szpara', description:'w drzwiach', busID:13, solved:false},
    ]
    stops:Stop[]= [
        {name:'Wroclaw'},
        {name:'Poznan'},
        {name:'Gdansk'}
    ]
    getIssues():Issue[]{
        return this.issues;
    }

    getStops():Stop[]{
        return this.stops;
    }
}