import {Injectable} from '@angular/core';
import {Router, CanActivate} from '@angular/router';
import {AuthService} from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private router:Router
    , private loginService:AuthService){}

    canActivate(){
        if(this.loginService.IsLoggedIn())
            return true;

        this.router.navigate(['/dashboard']);
        return false;
    }
}