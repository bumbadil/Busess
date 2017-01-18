import {Component,OnInit, Input} from '@angular/core';
import {IssuesService} from './issues.service'; 
import {Router} from '@angular/router';
import {BusService} from './busses.service';
// import {MockService} from './in-memory-data.serice';
import {Issue} from './issue';
import {Bus} from './bus';
@Component(
{
    selector: 'issues',    
    templateUrl: 'issues.component.html',
    styleUrls: ['issues.component.css']
    
})
export class IssuesComponent implements OnInit{
    
    constructor(private issuesService:IssuesService, private busService:BusService,
     private router:Router){}

    selectedIssue:Issue;
    issues: Issue[] = new Array<Issue>();
    buses: Bus[];
    getIssues():void{
        console.log(this.issues);
    this.busService.getBusses()
        .then(buses=>this.buses = buses)
        .then(()=>
       this.buses.forEach(element => {
           this.issuesService.getIssues(element.id)
        .then(issues=>{
            this.issues.push(...issues)
        })
        
       }));
    // this.issuesService.getIssues(20)
    //      .then(issues=>this.issues= issues)
    // this.buses.forEach(element => {
    //     this.issuesService.getIssues(element.id)
    //     .then(issues=>issues.forEach(issue => {
    //         this.issues.push(issue);
    //     }))
    // });
    //    this.issuesService.getIssue()
    //    .then(issues => this.issues = issues);
        //.then(issues => this.issues = issues);
    }
    getIssue(id:number):void{
     //  this.issues = this.issuesService.getIssue(id);

         this.issuesService.getIssues(id)
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
        this.issuesService.delete(issue)
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
        this.issuesService.create(issue)
        .then(i=>this.issues.push(i));
    }
    resolve(issue:Issue):void{
        issue.solved = true;
        this.issuesService.update(issue)
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