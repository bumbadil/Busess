import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Bus} from './bus';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class BusService{

    constructor(private http: Http){}

    //private bussesUrl = '/buses'
    private bussesUrl = 'app/busses'
    private mockURL = 'app/busses'
    private headers = new Headers(
        {
 
            'Content-Type':'application/json'
        }
    );
     private headersPOST = new Headers(
        {
            'Access-Token':'mBxdJ7Mt8DydcbmL82-Fvw',
            'Client':'7rKXKZj1gPiQJ6ZcJf7bbg',
            'Token-Type':'Bearer',
            'Uid':'admin@test.com',
            'Content-Type':'application/x-www-form-urlencoded'
        }
    );
    private hp = new Headers();
    getBusses():Promise<Bus[]>{
        //return this.http.get('http://pks-app.herokuapp.com/buses')
        return this.http.get(this.mockURL)
        .toPromise()
        .then(response => response.json().data as Bus[])
    }
    getBus(id:number):Promise<Bus>{
        return this.getBusses()
        .then(busses=> busses.find(bus=>bus.id === id));
    }
    create(brand:string):Promise<Bus>{
        this.hp.append('Access-Token','zflHuLMf7VYdhEz3gj4nBw');
        this.hp.append('Client','QEVByXtNTEiAFv2fJo28Hw');
        this.hp.append('Token-Type','Bearer');
       this.hp.append('Uid','admin@test.com');
        this.hp.append( 'Content-Type','application/x-www-form-urlencoded');
        console.log(this.headersPOST);
        console.log(this.headers);
        const value = `brand=Auto&spaces=190&registration_number=DLB+1234`;
        return this.http.post(
            'http://pks-app.herokuapp.com/buses', value,
            {headers:this.hp})
            .toPromise()
            .then(res=>res.json().data)
            .catch(this.handleError);
        
    }
    createBus(bus:Bus):Promise<Bus>{
        return this.http.post(this.bussesUrl
        ,JSON.stringify(bus))
        .toPromise()
        .then(res => res.json().data);
    }
    delete(id:number):Promise<void>{
        const url = `${this.mockURL}/${id}`;
        return this.http.delete(url, {headers: this.headers})
        .toPromise()
        .then(()=>null)
        .catch(this.handleError);
    }
    // deletem(id:number):Promise<void>{
    //     return this.http.delete(this.mockURL)
    //     .toPromise()
    //     .then(()=>null);
    // }
    update(bus:Bus):Promise<void>{
        const url = `${this.bussesUrl}/${bus.id}`;
        return this.http.put(url, JSON.stringify(bus))
        .toPromise()
        .then(()=>bus)
        .catch(this.handleError);
    }
    private handleError(error:any):Promise<any>{
        console.error('An error occured', error);
        return Promise.reject(error.message || error);
    }
} 