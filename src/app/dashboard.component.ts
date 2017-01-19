import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';
import {User} from './user';
let $ = require('/usr/local/lib/node_modules/jquery/dist/jquery.min.js');
@Component({
    selector:'dashboard',
    templateUrl: 'dashboard.component.html',
    styleUrls: ['dashboard.component.css']
})

export class DashboardComponent{
     constructor(private authService:AuthService, private router:Router){}
    user:User;
    loggedIn:boolean = false;
    @Output()
    onLogin = new EventEmitter<string>();

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
        //    $.ajax({
        // type: "POST",
        // url: 'http://pks-app.herokuapp.com/auth/sign_in',
        // contenttype : 'application/x-www-form-urlencoded',
        // data: {email: 'admin@test.com',
        //         password: 'password', format:'json'},
        // dataType: 'json',
        // success: function(msg, status, jqXHR){
        //     console.log(jqXHR.getAllResponseHeaders());
        // }
        // });
        // console.log('done');
          this.authService.loginAjax(a,b)
        .then(user=>{
            this.user = user.data as User
         console.log(this.user.uid);   
        })//this.user = user)
        .then(()=>{ this.authService.loggedIn=true;
                    this.authService.currentUser = this.user;
                    this.onLogin.emit(this.user.role);
            //this.authService.IsLoggedIn();
            if(this.user.role==='passenger'){
                this.router.navigate(['/course']) 
            }else{
                this.router.navigate(['/busses']) 
            }
            });
        // if(this.user != null){
        //     this.loggedIn = true;
        //     this.router.navigate(['/busses']);
        // }
    }
    ngOnInit():void{
        
    }
}