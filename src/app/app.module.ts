import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {AppRoutingModule} from './app-routing.module';
import { AppComponent } from './app.component';
import {BusService} from './busses.service';
import {AuthService} from './auth.service';
import {BussesComponent} from './busses.component';
import {IssuesComponent} from './issues.component';
import {IssuesService} from './issues.service';
import {StopsComponent} from './stops.component';
import {MockService} from './in-memory-data.serice';
import {LoginComponent} from './login.component';
import {BusDetailComponent} from './bus-detail.component';
import {DashboardComponent} from './dashboard.component';
import {ProfileComponent} from './profile.component';
import {AuthGuard} from './auth-guard';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './mockApi';

@NgModule({
  declarations: [
    AppComponent,BussesComponent
    ,IssuesComponent,
    StopsComponent, LoginComponent,BusDetailComponent,
    ProfileComponent, DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,AppRoutingModule, InMemoryWebApiModule.forRoot(InMemoryDataService)
   ],
  providers: [BusService,AuthService, MockService, AuthGuard,IssuesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
