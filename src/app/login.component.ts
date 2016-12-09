import {Component, OnInit} from '@angular/core';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';
import {User} from './user';
@Component({
    selector: 'login',
    template: `<div *ngIf="loggedIn===false">
    <label>Login:</label><input #loginVal/>
    <label>Password: </label><input type=password #password/>
    <button (click)="login(loginVal.value, password.value);">
    Login </button>
    </div>
    <div *ngIf="user">
    <h4>Hi :{{user.uid}}</h4>
    <button (click)="logout()"> Logout</button>
    </div>`,
    styles: []
}
)
export class LoginComponent implements OnInit{

    constructor(private authService:AuthService, private router:Router){}
    user:User;
    loggedIn:boolean = false;
    login(login:string, password:string):void{
        console.log('siema');
        this.authService.login(login, password)
        .then(user=>this.user = user)
        .then(()=>this.loggedIn=true);
    }
    logout():void{
        this.user = null;
        this.loggedIn = false;
    }
    ngOnInit():void{
     
    }
}