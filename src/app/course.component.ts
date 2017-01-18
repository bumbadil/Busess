import {Component, Injectable, OnInit} from '@angular/core';
import {MockService} from './in-memory-data.serice';
import {CourseService} from './course.service';
import {Course} from './Course';
import {Router} from '@angular/router';
@Component({
    selector:'course',
    templateUrl: 'course.component.html',
    styleUrls:['course.component.css']
})

export class CourseComponent implements OnInit{

    constructor(private stopsService:CourseService, private router:Router){}
    
    courses:Course[];
    selectedCourse:Course;

    getCourses():void{
        this.stopsService.getCourses()
        .then(courses=>this.courses = courses);
    }
    add(name:string):void{
        this.stopsService.createCourse(name)
        .then(course=>this.courses.push(course));
    }
    onSelect(course:Course):void{
        this.selectedCourse = course;
    }
    goToDetails():void{
        let link = ['/courseDetail',this.selectedCourse.id];
        this.router.navigate(link);
    }
    ngOnInit():void{
       this.getCourses();
    }
}