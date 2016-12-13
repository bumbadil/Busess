import {Component, OnInit} from '@angular/core';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';
import {User} from './user';
@Component({
    selector:'dashboard',
    templateUrl: 'dashboard.component.html',
    styleUrls: ['dashboard.component.css']
})

export class DashboardComponent{
     constructor(private authService:AuthService, private router:Router){}
    user:User;
    loggedIn:boolean = false;

    login(a:string, b:string):void{
        console.log('siema');
        // this.authService.login(login, password)
        // .then(user=>this.user = user)
        // .then(()=>this.loggedIn=true);
        // console.log(this.authService.IsLoggedIn);
        //     this.router.navigate(['/dashboard']);
    }
    logout():void{
        this.user = null;
        this.loggedIn = false;
    }
    siema(a:string, b:string):void{
          this.authService.login(a, b)
        .then(user=>this.user = user)
        .then(()=>this.loggedIn=true);
        console.log(this.authService.IsLoggedIn);
            this.router.navigate(['/busses']);
    }
    ngOnInit():void{
     
    }
}