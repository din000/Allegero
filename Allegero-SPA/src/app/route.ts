import { Routes } from '@angular/router';
import { NavComponent } from './nav/nav.component';
import { Responsik2Component } from './responsik2/responsik2.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { MainSiteComponent } from './main_site/main_site.component';


export const appRoutes: Routes = [
    { path: 'nav', component: NavComponent},
    { path: 'main', component: MainSiteComponent},
    { path: 'użytkownicy', component: Responsik2Component},
    { path: 'polubienia', component: Responsik2Component},
    { path: '**', redirectTo: '', pathMatch: 'full'}
];
