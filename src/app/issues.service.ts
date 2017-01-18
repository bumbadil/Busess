import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Issue} from './issue';
import 'rxjs/add/operator/toPromise';
let $ = require('/usr/local/lib/node_modules/jquery/dist/jquery.min.js');
@Injectable()
export class IssuesService{

    private busIssueUrl = 'busess/placeHolder/issues';
   // private issueUrl = '/issues';
   private issueUrl ='app/issues';
    private mockURL = 'app/issues';
    private headers = new  Headers(  
        {
            'Content-Type':'application/json'
        });
    
    constructor(private http:Http) {
        
        
    }
     getIssuesList():Promise<Issue[]>{
         return this.http.get(this.mockURL)
         .toPromise()
         .then(res=>res.json() as Issue[])

    }
        getIssue():Promise<Issue[]>{
        return this.http.get(this.mockURL)
         .toPromise()
         .then(res=>res.json().data as Issue[])
        }
     getIssuesOLD(id:number):Promise<Issue>{
         const url = this.busIssueUrl.replace('placeHolder',`${id}`);
         return this.http.get(url)
         .toPromise()
         .then(res=>res.json().data as Issue[])
         .catch(this.errorHandler);
     }
     getIssues(id:number):Promise<Issue[]>{
         const url = `${'http://pks-app.herokuapp.com/buses'}/${id}/${'issues'}`;
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
                if(res.responseJson != undefined)
                return res.responseJson.data as Issue[];
            }
         });
     }
     getIssueMock(id:number):Promise<Issue[]>{
          return this.getIssue()
          .then(issues=>issues.filter(issue=>issue.busID===id));
     }
     updateOLD(issue:Issue):Promise<Issue>{
         const url = `${this.issueUrl}/${issue.busID}`;
         return this.http.put(url, JSON.stringify(issue), {headers : this.headers})
         .toPromise()
         .then(()=>issue)
         .catch(this.errorHandler);
     }
     update(issue:Issue):Promise<Issue>{
         const url = `${'http://pks-app.herokuapp.com/issues'}/${issue.id}`;
         let token:string = localStorage.getItem('token');
        let client:string = localStorage.getItem('client');
         return $.ajax({
             type: 'Put',
             url:url,
             body:
                 {solved:true}
             ,
             beforeSend: function(xhr){
                xhr.setRequestHeader
                xhr.setRequestHeader('Access-Token',token);
        xhr.setRequestHeader('Client', client);
       xhr.setRequestHeader('Token-Type','Bearer');
       xhr.setRequestHeader('Uid','admin@test.com');
        xhr.setRequestHeader( 'Content-Type','application/x-www-form-urlencoded');
            }
         });
     }
     updatem(issue:Issue):Promise<Issue>{
         const url = `${this.issueUrl}/${issue.id}`;
         return this.http.put(url, JSON.stringify(issue), {headers : this.headers})
         .toPromise()
         .then(()=>issue)
         .catch(this.errorHandler);
     }
     deleteOld(id:number):Promise<void>{
         const url = `${this.issueUrl}/${id}`;
         return this.http.delete(url, {headers:this.headers})
         .toPromise()
         .then(()=>null)
         .catch(this.errorHandler);
     }
      delete(issue:Issue):Promise<Issue>{
           const url = `${'http://pks-app.herokuapp.com/issues'}/${issue.id}`;
           let token:string = localStorage.getItem('token');
        let client:string = localStorage.getItem('client');
        return $.ajax({
            type:'DELETE',
            url: url,
            beforeSend: function(xhr){
                xhr.setRequestHeader
                xhr.setRequestHeader('Access-Token',token);
        xhr.setRequestHeader('Client', client);
       xhr.setRequestHeader('Token-Type','Bearer');
       xhr.setRequestHeader('Uid','admin@test.com');
        xhr.setRequestHeader( 'Content-Type','application/x-www-form-urlencoded');
            }
        });
      }
     createOLD(issue:Issue):Promise<Issue>{
         const url = this.busIssueUrl.replace('placeHolder',`${issue.busID}`);
         return this.http.post(url, JSON.stringify(issue), {headers:this.headers})
         .toPromise()
         .then(res=>res.json().data)
         .catch(this.errorHandler);
     }
     create(issue:Issue):Promise<Issue>{
         const url = `${'http://pks-app.herokuapp.com/buses'}/${issue.busID}/${'issues'}`;
          let token:string = localStorage.getItem('token');
        let client:string = localStorage.getItem('client');
        return $.ajax({
            type: 'POST',
            url:url,
            data: {
                name : issue.name,
                description : issue.description,
                solved : issue.solved
            },
            beforeSend: function(xhr){
                xhr.setRequestHeader
                xhr.setRequestHeader('Access-Token',token);
        xhr.setRequestHeader('Client', client);
       xhr.setRequestHeader('Token-Type','Bearer');
       xhr.setRequestHeader('Uid','admin@test.com');
        xhr.setRequestHeader( 'Content-Type','application/x-www-form-urlencoded');
            },
            success: function(msg, a, res){
                return res.responseJson.data as Issue;
            }
        });
     }
     createm(issue:Issue):Promise<Issue>{
       //  const url = this.busIssueUrl.replace('placeHolder',`${issue.busID}`);
         return this.http.post(this.issueUrl, JSON.stringify(issue), {headers:this.headers})
         .toPromise()
         .then(res=>res.json().data)
         .catch(this.errorHandler);
     }
     private errorHandler(error:any):Promise<any>{
         console.log('error occured', error);
         return Promise.reject(error.message|| error);
     }
}