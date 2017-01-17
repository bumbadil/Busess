import { Injectable} from '@angular/core';
import {Http, Headers, RequestMethod, RequestOptions} from '@angular/http';
import {User} from './user';
import 'rxjs/add/operator/toPromise';

// import {jquery} from '/usr/local/lib/node_modules/jquery';
let $ = require('/usr/local/lib/node_modules/jquery/dist/jquery.min.js');
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
    private options = new RequestOptions({
        method: RequestMethod.Post,

    });
    public loggedIn:boolean = false;

        login(login:string, password:string):Promise<User>{
            console.log('format=json&email='+login+'&password='+password);
            return this.http.post('http://pks-app.herokuapp.com/auth/sign_in',
            'format=json&email='+login+'&password='+password,{headers : this.headers})
            .toPromise()
            // .then(
            //     res => 
            //    // response => response.json().data as User
            //       //debugger;
            //      //res.json().data
            //         //this.loggedIn= true
                  
            //         console.log('siema' + res.headers)
            //         //debugger
                  
            //     ) 
            // .then(res=>{
            //     //console.log(res.headers);
            //     this.loggedIn = true;
            // })
            // .then(()=>this.IsLoggedIn())
            .catch(e=>console.log(e)) //this.handleError);        
        }

        loginNew(login:string, password:string):Promise<User>{
            return this.http.post('http://pks-app.herokuapp.com/auth/sign_in',
            'format=json&email='+login+'&password='+password,{headers: this.headers})
            .toPromise()
            //.then(res=>res.json())
            .catch(e=>console.log(e));
        }
        loginOP(login:string, password:string):Promise<User>{
            return this.http.options('http://pks-app.herokuapp.com/auth/sign_in',
            this.options)
            .toPromise()
            .then(res=>res.json())
            .catch(e=>console.log(e));
        }
        loginAjax(login:string, password:string):Promise<any>{          
        return $.ajax({
            type: "POST",
            async: 'false',
            url: 'http://pks-app.herokuapp.com/auth/sign_in',
            data: {email: login,
                    password: password},
            dataType: 'json',
            statusCode: {
                401:function(){
                    alert('Nie poprawny dane');
                }
            },
            success: function(msg,a, res){
                var obj =  res.responseJSON.data as User; 
                localStorage.setItem('token',res.getResponseHeader('Access-Token'));
                localStorage.setItem('client',res.getResponseHeader('Client'));
                return obj;
            }
            });
        }
     loginNewer(login:string, password:string){
           console.log('format=json&email='+login+'&password='+password);
           console.log({
                format : 'json',
                email: login,
                password:password
            });
            return this.http.post('http://pks-app.herokuapp.com/auth/sign_in',
            JSON.stringify({
                format : 'json',
                email: login,
                password:password
            }),{headers : this.headersPOST})
            .toPromise()
            // .subscribe(
            //     (res) => {
            //         res.json().data;
            //         console.log(res.headers)
            //     }) ;
            .then(res=>{
                console.log(res.headers);
                this.loggedIn = true;
            })
            .then(()=>this.IsLoggedIn())
            .catch(this.handleError);        
        }

    private handleError(error:any): Promise<any>{
        console.error('An error occured', error);
        return Promise.reject(error.message || error);
    }
    logout():void{
        localStorage.removeItem('token');
             localStorage.removeItem('client');
        this.loggedIn = false;
    }
    IsLoggedIn():boolean{
        console.log(this.loggedIn);
        if(this.loggedIn)
        {
            console.log('lol');
            console.log(localStorage.getItem('user'));
            return true;  
        }
        return false;
    }    
    
}