import {Component,OnInit, Input} from '@angular/core';
import {IssuesService} from './issues.service'; 
import {Router} from '@angular/router';
// import {MockService} from './in-memory-data.serice';
import {Issue} from './issue';
@Component(
{
    selector: 'issues',    
    templateUrl: 'issues.component.html',
    styleUrls: ['issues.component.css']
    
})
export class IssuesComponent implements OnInit{
    
    constructor(private issuesService:IssuesService
    , private router:Router){}

    selectedIssue:Issue;
    issues: Issue[];
    getIssues():void{
       this.issuesService.getIssue()
       .then(issues => this.issues = issues);
        //.then(issues => this.issues = issues);
    }
    getIssue(id:number):void{
     //  this.issues = this.issuesService.getIssue(id);
         this.issuesService.getIssueMock(id)
         .then(issues=> this.issues = issues);
         //.then(issues => this.issues.push(issues.find(issue=>issue.busID != id )));
    }
    onSelect(issue:Issue):void{
        this.selectedIssue = issue;
    }
    @Input()
    BusID:number;
    @Input()
    isOnDetails:boolean;

    delete(issue:Issue):void{
        this.issuesService.delete(issue.id)
        .then(()=>{
            this.issues = this.issues.filter(
                i=>i !== issue);
                if(this.selectedIssue===issue)
                {
                    this.selectedIssue = null;
                }
            
        });
    }
    add(name:string, description:string):void{
        var issue = new Issue();
        issue.name = name;
        issue.description = description;
        issue.solved = false;
        issue.busID = this.BusID;
        this.issuesService.createm(issue)
        .then(i=>this.issues.push(i));
    }
    resolve(issue:Issue):void{
        issue.solved = true;
        this.issuesService.updatem(issue)
        .then(()=>null);
    }
    ngOnInit():void{
        console.log(this.BusID);
        if(!this.isOnDetails){     
         this.getIssues();
        }else{       
         this.getIssue(this.BusID);
        }
    }

}