import { Component, OnInit } from '@angular/core';
import {AuthService} from './auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'PKS!!';

  isPassenger:boolean = false;
  constructor(private authService:AuthService){}

  ngOnInit(){
    var role = this.authService.getUserRole();
    if(role!=undefined)
    this.isPassenger = role==='passenger';
  }
  onLogin(role:string){
    console.log('fired');
    this.isPassenger = role ==='passenger';
  }
}
