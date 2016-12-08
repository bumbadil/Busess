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
    constructor(private busService:BusService, private router:Router){

    }
    getHeroes():void{
        this.busService.getBusses().then(
            busses => this.busses = busses
        );
    }
    addBus(brand:string):void{
        console.log(brand);
        brand = brand.trim();
        if(!brand) {return;}
        this.busService.create(brand)
        .then(bus=>{
            this.busses.push(bus);
            this.selectedBus = null;
        });
    }
    onSelect(bus:Bus):void{
        console.log("clicleklm typa");
        this.selectedBus =bus;
    }
    goToDetails():void{
        let link = ['/busDetail',this.selectedBus.id];
        this.router.navigate(link);
    }
    ngOnInit():void{
        this.getHeroes();
    }
}