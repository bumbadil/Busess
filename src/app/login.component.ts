import {Component, OnInit} from '@angular/core';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';
@Component({
    selector: 'login',
    template: `<div>
    <label>Login:</label><input #loginVal/>
    <label>Password: </label><input #password/>
    <button (click)="login(loginVal.value, password.value);">
    Login </button>
    </div>`,
    styles: []
}
)
export class LoginComponent implements OnInit{

    constructor(private authService:AuthService, private router:Router){}

    login(login:string, password:string):void{
        console.log('siema');
        this.authService.login(login, password);
    }
    ngOnInit():void{
     
    }
}