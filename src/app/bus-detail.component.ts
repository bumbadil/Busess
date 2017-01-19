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
    @Input()
    isNew:boolean;

    constructor(private busDetailService:BusService
    ,private route:ActivatedRoute
    ,private location:Location){}
    
    canViewIssues:boolean;

    ngOnInit():void{
        this.route.params.forEach((params:Params)=>
        {
            let id =+params['id'];
            if(id !=0 ){;
            this.busDetailService.getBus(id)
            .then(bus=>this.bus = bus);  
            this.isNew = false;                
            }else{
                this.bus = new Bus();  
                this.isNew = true;        
            }
            this.setAccess();
        })
    }
    save():void{
        this.busDetailService.create(this.bus)
        .then(()=>this.location.back());
    }
        setAccess(){
        var role = this.busDetailService.userAccess();
        this.canViewIssues = (role==='admin' || role==='mechanic' || role==="driver");
        console.log(this.canViewIssues);
    }
    goBack():void{
        this.location.back();
    }

    
}