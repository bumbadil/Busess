import {Component,OnInit} from '@angular/core';
import {IssuesService} from './issues.service'; 

@Component(
{
    selector: 'isses',
    moduleId: module.id,
    template: ``,
    styles: []
    
})
export class IssuesComponent implements OnInit{
    
    constructor(private issuesService:IssuesService){}

    ngOnInit():void{
        
    }

}