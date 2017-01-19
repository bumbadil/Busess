import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Bus} from './bus';
let $ = require('/usr/local/lib/node_modules/jquery/dist/jquery.min.js');
import 'rxjs/add/operator/toPromise';
import {AuthService} from './auth.service';
@Injectable()
export class BusService{

    constructor(private http: Http, private authService:AuthService){}

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
    getBussesOLD():Promise<Bus[]>{
        return this.http.get('http://pks-app.herokuapp.com/buses')
       // return this.http.get(this.mockURL)
        .toPromise()
        .then(response => response.json().data as Bus[])
    }
    getBusses():Promise<Bus[]>{
       return $.ajax({
           method: 'GET',
           url: 'http://pks-app.herokuapp.com/buses',
           success: function(msg, a, res){
               var obj  = res.responseJSON.data as Bus[]
               return obj
           }           
        });
    }
    getBus(id:number):Promise<Bus>{
        return this.getBusses()
        .then(busses=> busses.find(bus=>bus.id === id));
    }
    createOLD(brand:string):Promise<Bus>{
        // this.hp.append('Access-Token','E3UlbgzkJSdOodSAvdOREg');
        // this.hp.append('Client','CseeS16lQfrJImeZ4t2VwA');
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
    create(bus:Bus):Promise<any>{
        let token:string = localStorage.getItem('token');
        let client:string = localStorage.getItem('client');
        var uid = this.authService.currentUser.uid;
        console.log(bus);
        return $.ajax({
            type: "POST",
            url: 'http://pks-app.herokuapp.com/buses',
            beforeSend: function(xhr){
                xhr.setRequestHeader
                xhr.setRequestHeader('Access-Token',token);
        xhr.setRequestHeader('Client', client);
       xhr.setRequestHeader('Token-Type','Bearer');
       xhr.setRequestHeader('Uid',uid);
        xhr.setRequestHeader( 'Content-Type','application/x-www-form-urlencoded');
            },
            data: {
            brand:bus.brand,
            registration_number: bus.registration_number,
            spaces: bus.spaces    
            },
           // headers: this.hp,
            success:function(msg, a , res){
                  localStorage.removeItem('token');
                  localStorage.removeItem('client');
                   localStorage.setItem('token',res.getResponseHeader('Access-Token'));
                localStorage.setItem('client',res.getResponseHeader('Client'));
                return msg;
            }
        });
    }
    createBus(bus:Bus):Promise<Bus>{
        return this.http.post(this.bussesUrl
        ,JSON.stringify(bus))
        .toPromise()
        .then(res => res.json().data);
    }
    deleteOLD(id:number):Promise<void>{
        const url = `${this.mockURL}/${id}`;
        return this.http.delete(url, {headers: this.headers})
        .toPromise()
        .then(()=>null)
        .catch(this.handleError);
    }
    delete(id:number):Promise<void>{
       let token:string = localStorage.getItem('token');
        let client:string = localStorage.getItem('client');
        var uid = this.authService.currentUser.uid;
        return $.ajax({
            type : "DELETE",
            beforeSend: function(xhr){
                xhr.setRequestHeader
                xhr.setRequestHeader('Access-Token',token);
        xhr.setRequestHeader('Client', client);
       xhr.setRequestHeader('Token-Type','Bearer');
       xhr.setRequestHeader('Uid',uid);
        xhr.setRequestHeader( 'Content-Type','application/x-www-form-urlencoded');
            },
            url: `${'http://pks-app.herokuapp.com/buses'}/${id}`,
            success:function(msg, a, res){
                             localStorage.removeItem('token');
                  localStorage.removeItem('client');
                   localStorage.setItem('token',res.getResponseHeader('Access-Token'));
                localStorage.setItem('client',res.getResponseHeader('Client'));
                console.log('deleted');
            }
        });
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

    userAccess():string{
        return this.authService.getUserRole();
    }
} 