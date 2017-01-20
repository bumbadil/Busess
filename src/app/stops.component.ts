import {Component, Injectable, OnInit} from '@angular/core';
import {MockService} from './in-memory-data.serice';
import {StopsService} from './stop.service';
import {AuthService} from './auth.service';
import {Stop} from './stop';

@Component({
    selector:'stops',
    templateUrl: 'stops.component.html',
    styleUrls:['stops.component.css']
})

export class StopsComponent implements OnInit{

    constructor(private stopsService:StopsService, private authService:AuthService){}
    
    stops:Stop[];
    selectedStop:Stop;
    canDelete:boolean;
    getStops():void{
        this.stopsService.getStops()
        .then(stops=>this.stops = stops);
    }
    add(name:string):void{
        this.stopsService.createStop(name)
        .then(stop=>this.stops.push(stop));
    }
    onSelect(stop:Stop):void{
        this.selectedStop = stop;
    }
    delete(stop:Stop):void{
        this.stopsService.delete(stop)
        .then(()=>{
            this.stops = this.stops.filter(
                i=>i !== stop);
                if(this.selectedStop===stop)
                {
                    this.selectedStop = null;
                }
            
        });
    }
    setAccess(){
      var role=  this.authService.getUserRole();
      this.canDelete = role ==='admin';
    }
    ngOnInit():void{
       this.getStops();
       this.setAccess();
    }
}