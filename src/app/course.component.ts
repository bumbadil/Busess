import {Component, Injectable, OnInit} from '@angular/core';
import {MockService} from './in-memory-data.serice';
import {CourseService} from './course.service';
import {Course} from './Course';

@Component({
    selector:'course',
    templateUrl: 'course.component.html',
    styleUrls:['course.component.css']
})

export class CourseComponent implements OnInit{

    constructor(private stopsService:CourseService){}
    
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
    ngOnInit():void{
       this.getCourses();
    }
}