import {Component, OnInit, Input} from '@angular/core';
import {MockService} from './in-memory-data.serice';
import {BusService} from './busses.service';
import {ActivatedRoute, Params} from '@angular/router';
import {Location} from '@angular/common';
import {Bus} from './bus';
@Component({
    selector: 'bus-detail',
    templateUrl: 'bus-detail.component.html',
    styleUrls:['bus-detail.component.css']
})
export class BusDetailComponent implements OnInit{
    @Input()
    bus:Bus;

    constructor(private busDetailService:BusService
    ,private route:ActivatedRoute
    ,private location:Location){}
    

    ngOnInit():void{
        this.route.params.forEach((params:Params)=>
        {
            let id =+params['id'];
            this.busDetailService.getBus(id)
            .then(bus=>this.bus = bus);
        })
    }

    goBack():void{
        this.location.back();
    }
    
    
}