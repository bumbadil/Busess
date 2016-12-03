import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {AppRoutingModule} from './app-routing.module';
import { AppComponent } from './app.component';
import {BusService} from './busses.service';
import {AuthService} from './auth.service';
import {BussesComponent} from './busses.component';
import {LoginComponent} from './login.component';
@NgModule({
  declarations: [
    AppComponent,BussesComponent, LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,AppRoutingModule
  ],
  providers: [BusService,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
