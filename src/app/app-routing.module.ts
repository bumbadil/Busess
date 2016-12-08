import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router'
import {BussesComponent} from './busses.component';
import {LoginComponent} from './login.component';
import {IssuesComponent} from './issues.component';
import {StopsComponent} from './stops.component';
const routes: Routes= [
    {path: 'busses', component: BussesComponent},
    {path: 'login', component: LoginComponent},
    {path: 'issues', component: IssuesComponent},
    {path: 'stops', component: StopsComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule{

}