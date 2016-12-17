import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router'
import {BussesComponent} from './busses.component';
import {BusDetailComponent} from './bus-detail.component';
import {LoginComponent} from './login.component';
import {IssuesComponent} from './issues.component';
import {DashboardComponent} from './dashboard.component';
import {StopsComponent} from './stops.component';
import {ProfileComponent} from './profile.component';
import {AuthGuard} from './auth-guard';
const routes: Routes= [
    {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
    // {path: 'busses', component: BussesComponent, canActivate: [AuthGuard]},
    {path: 'busses', component: BussesComponent},
    {path: 'login', component: LoginComponent},
    {path: 'issues', component: IssuesComponent},
    {path: 'busDetail/:id', component: BusDetailComponent},
    {path: 'busDetail', component: BusDetailComponent},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'stops', component: StopsComponent},
    {path: 'profile', component: ProfileComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule{

}