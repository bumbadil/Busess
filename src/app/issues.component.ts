import {Component,OnInit, Input} from '@angular/core';
import {IssuesService} from './issues.service'; 
import {Router} from '@angular/router';
import {MockService} from './in-memory-data.serice';
import {Issue} from './issue';
@Component(
{
    selector: 'issues',    
    templateUrl: 'issues.component.html',
    styleUrls: ['issues.component.css']
    
})
export class IssuesComponent implements OnInit{
    
    constructor(private issuesService:MockService
    , private router:Router){}

    selectedIssue:Issue;
    issues: Issue[];

    getIssues():void{
        this.issues = this.issuesService.getIssues()
        //.then(issues => this.issues = issues);
    }
    getIssue(id:number):void{
        this.issues = this.issuesService.getIssue(id);
    }
    @Input()
    BusID:number;

    ngOnInit():void{
        if(this.BusID!=null){
        this.getIssue(this.BusID);
        }else{       
        this.getIssues();
        }
    }

}