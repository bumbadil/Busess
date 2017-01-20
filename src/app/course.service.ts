import {Injectable} from '@angular/core'
import {Course} from './Course';
import {Http, Headers} from '@angular/http';
import {Bus} from './bus';
import {Stop} from './stop';
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
                                      var newToken = res.getResponseHeader('Access-Token');
                var newClient = res.getResponseHeader('Client')
                if(newToken!=null)
                {
                    localStorage.removeItem('token');
                      localStorage.setItem('token',res.getResponseHeader('Access-Token'));
                }
                if(newClient!=null){
                    localStorage.removeItem('client');
                     localStorage.setItem('client',res.getResponseHeader('Client'));
                }
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
                                      var newToken = res.getResponseHeader('Access-Token');
                var newClient = res.getResponseHeader('Client')
                if(newToken!=null)
                {
                    localStorage.removeItem('token');
                      localStorage.setItem('token',res.getResponseHeader('Access-Token'));
                }
                if(newClient!=null){
                    localStorage.removeItem('client');
                     localStorage.setItem('client',res.getResponseHeader('Client'));
                }
                if(res.responseJson != undefined)
                var obj = res.responseJson.data as Course
                return res;
            }
        });
    }
        getCourse(id:number):Promise<Course>{
        return this.getCourses()
        .then(courses=> courses.find(course=>course.id === id));
    }

    getCourseBuses(id:number):Promise<Bus[]>{
         const url = `${'http://pks-app.herokuapp.com/courses'}/${id}/${'buses'}`;
        let token:string = localStorage.getItem('token');
        let client:string = localStorage.getItem('client');
         return $.ajax({
             type: "GET",
             url: url,
             beforeSend: function(xhr){
                xhr.setRequestHeader
                xhr.setRequestHeader('Access-Token',token);
        xhr.setRequestHeader('Client', client);
       xhr.setRequestHeader('Token-Type','Bearer');
       xhr.setRequestHeader('Uid','admin@test.com');
        xhr.setRequestHeader( 'Content-Type','application/x-www-form-urlencoded');
            }, 
            success:function(msg, a, res){
                                      var newToken = res.getResponseHeader('Access-Token');
                var newClient = res.getResponseHeader('Client')
                if(newToken!=null)
                {
                    localStorage.removeItem('token');
                      localStorage.setItem('token',res.getResponseHeader('Access-Token'));
                }
                if(newClient!=null){
                    localStorage.removeItem('client');
                     localStorage.setItem('client',res.getResponseHeader('Client'));
                }
                if(res.responseJson != undefined)
                return res.responseJson.data as Bus[];
            }
         });
     }
     getCourseStops(id:number):Promise<Stop[]>{
         const url = `${'http://pks-app.herokuapp.com/courses'}/${id}/${'stops'}`;
        let token:string = localStorage.getItem('token');
        let client:string = localStorage.getItem('client');
         return $.ajax({
             type: "GET",
             url: url,
             beforeSend: function(xhr){
                xhr.setRequestHeader
                xhr.setRequestHeader('Access-Token',token);
        xhr.setRequestHeader('Client', client);
       xhr.setRequestHeader('Token-Type','Bearer');
       xhr.setRequestHeader('Uid','admin@test.com');
        xhr.setRequestHeader( 'Content-Type','application/x-www-form-urlencoded');
            }, 
            success:function(msg, a, res){
                                      var newToken = res.getResponseHeader('Access-Token');
                var newClient = res.getResponseHeader('Client')
                if(newToken!=null)
                {
                    localStorage.removeItem('token');
                      localStorage.setItem('token',res.getResponseHeader('Access-Token'));
                }
                if(newClient!=null){
                    localStorage.removeItem('client');
                     localStorage.setItem('client',res.getResponseHeader('Client'));
                }
                if(res.responseJson != undefined)
                return res.responseJson.data as Stop[];
            }
         });
     }

}