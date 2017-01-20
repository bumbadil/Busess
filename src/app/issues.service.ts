import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Issue} from './issue';
import {AuthService} from './auth.service'
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
    
    constructor(private http:Http, private authService:AuthService) {
        
        
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
        var uid = this.authService.currentUser.uid;
         return $.ajax({
             type: "GET",
             url: url,
             beforeSend: function(xhr){
                xhr.setRequestHeader
                xhr.setRequestHeader('Access-Token',token);
        xhr.setRequestHeader('Client', client);
       xhr.setRequestHeader('Token-Type','Bearer');
       xhr.setRequestHeader('Uid',uid);
        xhr.setRequestHeader( 'Content-Type','application/x-www-form-urlencoded');
            }, 
            success:function(msg, a, res){
                var newToken = res.getResponseHeader('Access-Token');
                var newClient = res.getResponseHeader('Client');
                console.log(newToken);
                if(newToken!=null)
                {
                    console.log('przepialem')
                    localStorage.removeItem('token');
                      localStorage.setItem('token',res.getResponseHeader('Access-Token'));
                }
                if(newClient!=null){
                    console.log('clinet tez');
                    localStorage.removeItem('client');
                     localStorage.setItem('client',res.getResponseHeader('Client'));
                }
                  
                 
               
                if(res.responseJson != undefined)
                return res.responseJson.data as Issue[];
            }
         });
     }
     getIssueMock(id:number):Promise<Issue[]>{
          return this.getIssue()
          .then(issues=>issues.filter(issue=>issue.bus_id===id));
     }
     updateOLD(issue:Issue):Promise<Issue>{
         const url = `${this.issueUrl}/${issue.bus_id}`;
         return this.http.put(url, JSON.stringify(issue), {headers : this.headers})
         .toPromise()
         .then(()=>issue)
         .catch(this.errorHandler);
     }
     update(issue:Issue):Promise<any>{
         const url = `${'http://pks-app.herokuapp.com/issues'}/${issue.id}`;
         let token:string = localStorage.getItem('token');
        let client:string = localStorage.getItem('client');
        var uid = this.authService.currentUser.uid;
         return $.ajax({
             type: "PUT",
             url:url,
             data:`${'solved='}${issue.solved}&${'bus_id='}${issue.bus_id}`
             ,
              statusCode: {
                403:function(msg){
                    console.log(msg);
                }
            },
             beforeSend: function(xhr){
                xhr.setRequestHeader('Access-Token',token);
        xhr.setRequestHeader('Client', client);
       xhr.setRequestHeader('Token-Type','Bearer');
       xhr.setRequestHeader('Uid',uid);
        xhr.setRequestHeader( 'Content-Type','application/x-www-form-urlencoded');
            },
            success:function(msg, a, res){
                                          var newToken = res.getResponseHeader('Access-Token');
                var newClient = res.getResponseHeader('Client');
                console.log(newToken);
                if(newToken!=null)
                {
                    console.log('przepialem')
                    localStorage.removeItem('token');
                      localStorage.setItem('token',res.getResponseHeader('Access-Token'));
                }
                if(newClient!=null){
                    console.log('clinet tez');
                    localStorage.removeItem('client');
                     localStorage.setItem('client',res.getResponseHeader('Client'));
                }
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
        var uid = this.authService.currentUser.uid;
        return $.ajax({
            type:'DELETE',
            url: url,
            data:`${'bus_id='}${issue.bus_id}`,
            beforeSend: function(xhr){
                xhr.setRequestHeader('Access-Token',token);
        xhr.setRequestHeader('Client', client);
       xhr.setRequestHeader('Token-Type','Bearer');
       xhr.setRequestHeader('Uid',uid);
        xhr.setRequestHeader( 'Content-Type','application/x-www-form-urlencoded');
            }, 
            success:function(msg, a, res){
                                   var newToken = res.getResponseHeader('Access-Token');
                var newClient = res.getResponseHeader('Client');
                console.log(newToken);
                if(newToken!=null)
                {
                    console.log('przepialem')
                    localStorage.removeItem('token');
                      localStorage.setItem('token',res.getResponseHeader('Access-Token'));
                }
                if(newClient!=null){
                    console.log('clinet tez');
                    localStorage.removeItem('client');
                     localStorage.setItem('client',res.getResponseHeader('Client'));
                }
            }
        });
      }
     createOLD(issue:Issue):Promise<Issue>{
         const url = this.busIssueUrl.replace('placeHolder',`${issue.bus_id}`);
         return this.http.post(url, JSON.stringify(issue), {headers:this.headers})
         .toPromise()
         .then(res=>res.json().data)
         .catch(this.errorHandler);
     }
     create(issue:Issue):Promise<Issue>{
         const url = `${'http://pks-app.herokuapp.com/buses'}/${issue.bus_id}/${'issues'}`;
          let token:string = localStorage.getItem('token');
        let client:string = localStorage.getItem('client');
        var uid = this.authService.currentUser.uid;
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
       xhr.setRequestHeader('Uid',uid);
        xhr.setRequestHeader( 'Content-Type','application/x-www-form-urlencoded');
            },
            success: function(msg, a, res){
                                   var newToken = res.getResponseHeader('Access-Token');
                var newClient = res.getResponseHeader('Client');
                console.log(newToken);
                if(newToken!=null)
                {
                    console.log('przepialem')
                    localStorage.removeItem('token');
                      localStorage.setItem('token',res.getResponseHeader('Access-Token'));
                }
                if(newClient!=null){
                    console.log('clinet tez');
                    localStorage.removeItem('client');
                     localStorage.setItem('client',res.getResponseHeader('Client'));
                }
                if(res.responseJson != undefined)
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
         userAccess():string{
        return this.authService.getUserRole();
    }
}