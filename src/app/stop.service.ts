import {Injectable} from '@angular/core'
import {Stop} from './stop';
import {Http, Headers} from '@angular/http';

import 'rxjs/add/operator/toPromise';
let $ = require('/usr/local/lib/node_modules/jquery/dist/jquery.min.js');
@Injectable()
export class StopsService{
   constructor(private http:Http) {               
    }

    getStops():Promise<Stop[]>{
        return $.ajax({
            type:'GET',
            url: 'http://pks-app.herokuapp.com/stops',
            success: function(msg, a, res){
               var obj  = res.responseJSON.data as Stop[]
               return obj
           } 
        });
    }
     createStop(name:string):Promise<Stop>{
        let token:string = localStorage.getItem('token');
        let client:string = localStorage.getItem('client');
        return $.ajax({
            type: "POST",
            url: 'http://pks-app.herokuapp.com/stops',
            beforeSend: function(xhr){
                xhr.setRequestHeader
                xhr.setRequestHeader('Access-Token',token);
        xhr.setRequestHeader('Client', client);
       xhr.setRequestHeader('Token-Type','Bearer');
       xhr.setRequestHeader('Uid','admin@test.com');
        xhr.setRequestHeader( 'Content-Type','application/x-www-form-urlencoded');
            },
            data: {
            name:name   
            },
            success:function(msg, a , res){
                       localStorage.removeItem('token');
                  localStorage.removeItem('client');
                   localStorage.setItem('token',res.getResponseHeader('Access-Token'));
                localStorage.setItem('client',res.getResponseHeader('Client'));
                if(res.responseJson != undefined)
                var obj = res.responseJson.data as Stop
                return res;
            }
        });
    }
}