import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Issue} from './issue';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class IssuesService{

    private busIssueUrl = 'busess/placeHolder/issues';
    private issueUrl = '/issues'
    private headers = new  Headers(  
        {
            'Content-Type':'application/json'
        });
    
    constructor(private http:Http) {
        
        
    }

     getIssues(id:number):Promise<Issue>{
         const url = this.busIssueUrl.replace('placeHolder',`${id}`);
         return this.http.get(url)
         .toPromise()
         .then(res=>res.json().data as Issue[])
         .catch(this.errorHandler);
     }
     update(issue:Issue):Promise<Issue>{
         const url = `${this.issueUrl}/${issue.busID}`;
         return this.http.put(url, JSON.stringify(issue), {headers : this.headers})
         .toPromise()
         .then(()=>issue)
         .catch(this.errorHandler);
     }
     delete(id:number):Promise<void>{
         const url = `${this.issueUrl}/${id}`;
         return this.http.delete(url, {headers:this.headers})
         .toPromise()
         .then(()=>null)
         .catch(this.errorHandler);
     }
     create(issue:Issue):Promise<Issue>{
         const url = this.busIssueUrl.replace('placeHolder',`${issue.busID}`);
         return this.http.post(url, JSON.stringify(issue), {headers:this.headers})
         .toPromise()
         .then(res=>res.json().data)
         .catch(this.errorHandler);
     }
     private errorHandler(error:any):Promise<any>{
         console.log('error occured', error);
         return Promise.reject(error.message|| error);
     }
}