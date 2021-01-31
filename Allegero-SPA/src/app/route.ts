import { Routes } from '@angular/router';
import { NavComponent } from './nav/nav.component';
import { Responsik2Component } from './responsik2/responsik2.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { MainSiteComponent } from './main_site/main_site.component';
import { MainResolver } from './_resolvers/main.resolver';
import { ManyAuctionsResolver } from './_resolvers/manyAuctions.resolver';
import { ProductCardResolver } from './_resolvers/productCard.resolver';
import { UserResolver } from './_resolvers/user.resolver';
import { ProductAddComponent } from './product-add/product-add.component';
import { AuthGuard } from './_guards/auth.guard';
import { EditingAutcionResolver } from './_resolvers/editingAuction.resolver';


export const appRoutes: Routes = [
    { path: 'nav', component: NavComponent, resolve: {mainData: MainResolver}},
    { path: 'main', component: MainSiteComponent, resolve: {mainData: MainResolver,
                                                            manyAuctions: ManyAuctionsResolver}},
    { path: 'productCard/:idAuction/:idUser', component: ProductCardComponent, resolve: {auction: ProductCardResolver,
                                                                                         user: UserResolver}},
    { path: 'productAdd/:idUser', component: ProductAddComponent, resolve: {editingAuctionRoute: EditingAutcionResolver}},
    { path: 'polubienia', component: Responsik2Component},
    { path: '**', redirectTo: '', pathMatch: 'full'}
];
