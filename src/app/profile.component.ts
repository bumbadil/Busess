import {Component, Input, OnInit} from '@angular/core';
import {User} from './user';

@Component({
    selector:'profile',
    templateUrl: 'profile.component.html',
    styleUrls:['profile.component.css']
})
export class ProfileComponent implements OnInit{
    
    @Input()
    user:User;
    
    ngOnInit():void{

    }
}