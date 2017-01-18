import {Component, OnInit, Input} from '@angular/core';
import {MockService} from './in-memory-data.serice';
import {CourseService} from './course.service';
import {ActivatedRoute, Params} from '@angular/router';
import {Location} from '@angular/common';
import {Course} from './Course';
import {Bus} from './bus';
import {Stop} from './stop'
@Component({
    selector: 'course-detail',
    templateUrl: 'course-details.component.html',
    styleUrls:['course-details.component.css']
})
export class CourseDetailComponent implements OnInit{
    @Input()
    Course:Course;
    @Input()
    isNew:boolean;
    busses:Bus[];
    stops:Stop[];
    constructor(private courseService:CourseService
    ,private route:ActivatedRoute
    ,private location:Location){}
    

    ngOnInit():void{
        this.route.params.forEach((params:Params)=>
        {
            let id =+params['id'];
            if(id !=0 ){;
            this.courseService.getCourse(id)
            .then(course=>this.Course = course);  
            this.isNew = false;      
            }else{
                this.Course = new Course();  
                this.isNew = true;        
            }
        })
    }
    // save():void{
    //     this.busDetailService.create(this.bus)
    //     .then(()=>this.location.back());
    // }
    goBack():void{
        this.location.back();
    }

    
}