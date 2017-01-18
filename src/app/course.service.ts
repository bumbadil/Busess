import {Injectable} from '@angular/core'
import {Course} from './Course';
import {Http, Headers} from '@angular/http';

import 'rxjs/add/operator/toPromise';
let $ = require('/usr/local/lib/node_modules/jquery/dist/jquery.min.js');
@Injectable()
export class CourseService{
   constructor(private http:Http) {               
    }

    getCourses():Promise<Course[]>{
        let token:string = localStorage.getItem('token');
        let client:string = localStorage.getItem('client');
        return $.ajax({
            type:'GET',
            url: 'http://pks-app.herokuapp.com/courses',
             beforeSend: function(xhr){
                xhr.setRequestHeader
                xhr.setRequestHeader('Access-Token',token);
        xhr.setRequestHeader('Client', client);
       xhr.setRequestHeader('Token-Type','Bearer');
       xhr.setRequestHeader('Uid','admin@test.com');
        xhr.setRequestHeader( 'Content-Type','application/x-www-form-urlencoded');
            },
            success: function(msg, a, res){
               var obj  = res.responseJSON.data as Course[]
               return obj
           } 
        });
    }
     createCourse(name:string):Promise<Course>{
        let token:string = localStorage.getItem('token');
        let client:string = localStorage.getItem('client');
        return $.ajax({
            type: "POST",
            url: 'http://pks-app.herokuapp.com/courses',
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
                if(res.responseJson != undefined)
                var obj = res.responseJson.data as Course
                return res;
            }
        });
    }
}