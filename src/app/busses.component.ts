import {Component, OnInit} from '@angular/core';
import {Bus} from './bus';
import {BusService} from './busses.service';
import {Router} from '@angular/router';

@Component({
    selector:'busses',
    templateUrl: 'busses.component.html',
    styleUrls:['busses.component.css']
})
export class BussesComponent implements OnInit{

    bus : Bus;

    busses : Bus[];
    selectedBus:Bus;
    canDelete:boolean;
    constructor(private busService:BusService, private router:Router){

    }
    getBusses():void{
        this.busService.getBusses().then(
            busses => this.busses = busses
        );
    }
    addBus(brand:string):void{
        console.log(brand);
        brand = brand.trim();
        if(!brand) {return;}
        this.busService.createOLD(brand)
        .then(bus=>{
            this.busses.push(bus);
            this.selectedBus = null;
        });
    }
    onSelect(bus:Bus):void{
        this.selectedBus =bus;
    }
    delete(bus:Bus):void{
        this.busService.delete(bus.id)
        .then(()=>{
            this.busses = this.busses.filter(
                b=> b!== bus);
                if(this.selectedBus===bus){
                    this.selectedBus=null;
                }       
        });
    }
    goToDetails():void{
        let link = ['/busDetail',this.selectedBus.id];
        this.router.navigate(link);
    }
    createNew():void{
        let link = ['/busDetail',0];
        this.router.navigate(link);
    }
    setAccess(){
        var role = this.busService.userAccess();
        this.canDelete = role==='admin';
    }
    ngOnInit():void{
        this.getBusses();
        this.setAccess();
    }
}