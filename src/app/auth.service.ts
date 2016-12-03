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
        }
    );
    private loggedIn:boolean = false;

        login(login:string, password:string):Promise<User>{
            console.log('format=json&email='+login+'&password='+password);
            return this.http.post('http://pks-app.herokuapp.com/auth/sign_in',
            'format=json&email='+login+'&password='+password,{headers : this.headers})
            .toPromise()
            .then(res=>
            {
                res.json().data;

                    localStorage.setItem('auth_token', res.headers.get('access-token'));
                    localStorage.setItem('client', res.headers.get('client'));
                    this.loggedIn = true;
                
            })
            .catch(this.handleError);          
        }
    private handleError(error:any): Promise<any>{
        console.error('An error occured', error);
        return Promise.reject(error.message || error);
    }

    IsLoggedIn():boolean{
        if(this.loggedIn)
        {
            console.log(localStorage.getItem('auth_token'));
            console.log(localStorage.getItem('client'));  
            return true;  
        }
        return false;
    }    
    
}