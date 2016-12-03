import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Bus} from './bus';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class BusService{

    constructor(private http: Http){}

    private bussesUrl = 'app/buses'

    private headers = new Headers(
        {
            'Content-Type':'application/json'
        }
    );
    getBusses():Promise<Bus[]>{
        return this.http.get('http://pks-app.herokuapp.com/buses')
        .toPromise()
        .then(response => response.json() as Bus[])
    }
    getBus(id:number):Promise<Bus>{
        return this.getBusses()
        .then(busses=> busses.find(bus=>bus.id === id));
    }
    create(brand:string):Promise<Bus>{
        return this.http.post(
            this.bussesUrl, JSON.stringify({brand:brand}),
            {headers:this.headers})
            .toPromise()
            .then(res=>res.json().data)
            .catch(this.handleError);
        
    }
    private handleError(error:any):Promise<any>{
        console.error('An error occured', error);
        return Promise.reject(error.message || error);
    }
} 