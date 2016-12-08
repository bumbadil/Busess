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
import {StopsComponent} from './stops.component';
import {MockService} from './in-memory-data.serice';
import {LoginComponent} from './login.component';
@NgModule({
  declarations: [
    AppComponent,BussesComponent
    ,IssuesComponent,
    StopsComponent, LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,AppRoutingModule
  ],
  providers: [BusService,AuthService, MockService],
  bootstrap: [AppComponent]
})
export class AppModule { }
