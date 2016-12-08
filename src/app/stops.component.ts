import {Component, Injectable, OnInit} from '@angular/core';
import {MockService} from './in-memory-data.serice';
import {Stop} from './stop';

@Component({
    selector:'stops',
    templateUrl: 'stops.component.html',
    styleUrls:['stops.component.css']
})

export class StopsComponent implements OnInit{

    constructor(private stopsService:MockService){}
    
    stops:Stop[];
    selectedStop:Stop;

    getStops():void{
        this.stops = this.stopsService.getStops();
    }
    ngOnInit():void{
       this.getStops();
    }
}