import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router'
import {BussesComponent} from './busses.component';
import {LoginComponent} from './login.component';
const routes: Routes= [
    {path: 'busses', component: BussesComponent},
    {path: 'login', component: LoginComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule{

}