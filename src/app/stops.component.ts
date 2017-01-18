import {Component, Injectable, OnInit} from '@angular/core';
import {MockService} from './in-memory-data.serice';
import {StopsService} from './stop.service';
import {Stop} from './stop';

@Component({
    selector:'stops',
    templateUrl: 'stops.component.html',
    styleUrls:['stops.component.css']
})

export class StopsComponent implements OnInit{

    constructor(private stopsService:StopsService){}
    
    stops:Stop[];
    selectedStop:Stop;

    getStops():void{
        this.stopsService.getStops()
        .then(stops=>this.stops = stops);
    }
    add(name:string):void{
        this.stopsService.createStop(name)
        .then(stop=>this.stops.push(stop));
    }
    ngOnInit():void{
       this.getStops();
    }
}