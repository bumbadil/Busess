import { Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {User} from './user';
import 'rxjs/add/operator/toPromise';
@Injectable()
export class AuthService{
    
    constructor(private http:Http){}

  private headers = new Headers(
        {
            'Content-Type':'application/x-www-form-urlencoded'
        });
    private headersPOST = new Headers(
        {
            'Access-Token':'',
            'Client':'',
            'Token-Type':'',
            'Uid':'',
            'Content-Type':'application/x-www-form-urlencoded'
        });
    
    private loggedIn:boolean = false;

        login(login:string, password:string):Promise<User>{
            console.log('format=json&email='+login+'&password='+password);
            return this.http.post('http://pks-app.herokuapp.com/auth/sign_in',
            'format=json&email='+login+'&password='+password,{headers : this.headers})
            .toPromise()
            .then(
                res => 
                   // debugger;
                    //res.json().data
                    //this.loggedIn= true
                    console.log(res.headers)
                ) 
            .then(res=>{
                //console.log(res.headers);
                this.loggedIn = true;
            })
            // .then(()=>this.IsLoggedIn())
            .catch(this.handleError);        
        }
//  login(login:string, password:string){
//            console.log('format=json&email='+login+'&password='+password);
//            console.log({
//                 format : 'json',
//                 email: login,
//                 password:password
//             });
//             return this.http.post('http://pks-app.herokuapp.com/auth/sign_in',
//             JSON.stringify({
//                 format : 'json',
//                 email: login,
//                 password:password
//             }),{headers : this.headers})
//             .toPromise()
//             .subscribe(
//                 (res) => {
//                     res.json().data;
//                     console.log(res.headers)
//                 }) ;
//             .then(res=>{
//                 console.log(res.headers);
//                 this.loggedIn = true;
//             })
//             .then(()=>this.IsLoggedIn())
//             .catch(this.handleError);        
//         }

    private handleError(error:any): Promise<any>{
        console.error('An error occured', error);
        return Promise.reject(error.message || error);
    }
    logout():void{
        localStorage.removeItem('Access-Token');
        this.loggedIn = false;
    }
    IsLoggedIn():boolean{
        console.log('czesc');
        if(this.loggedIn)
        {
            console.log('lol');
            console.log(localStorage.getItem('auth_token'));
            console.log(localStorage.getItem('client'));  
            return true;  
        }
        return false;
    }    
    
}