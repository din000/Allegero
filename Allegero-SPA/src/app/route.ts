import { Routes } from '@angular/router';
import { NavComponent } from './nav/nav.component';
import { Responsik2Component } from './responsik2/responsik2.component';


export const appRoutes: Routes = [
    { path: 'nav', component: NavComponent},
    { path: 'asd', component: Responsik2Component},
    { path: 'użytkownicy', component: Responsik2Component},
    { path: 'polubienia', component: Responsik2Component},
    { path: '**', redirectTo: '', pathMatch: 'full'}
];
