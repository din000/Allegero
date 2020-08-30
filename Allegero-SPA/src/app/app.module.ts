import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './_services/auth.service';
import { NavComponent } from './nav/nav.component';
import { ResponsikComponent } from './responsywny_leyout/responsik/responsik.component';
import { Responsik2Component } from './responsik2/responsik2.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AlertifyService } from './_services/_alertify.service';
import { HttpClientModule } from '@angular/common/http';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { appRoutes } from './route';
import { ProductCardComponent } from './product-card/product-card.component';
import { MainSiteComponent } from './main_site/main_site.component';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { UserService } from './_services/user.service';
import { MainResolver } from './_resolvers/main.resolver';
import { ManyAuctionsResolver } from './_resolvers/manyAuctions.resolver';


@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      ResponsikComponent,
      Responsik2Component,
      ProductCardComponent,
      MainSiteComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      NgbModule,
      BrowserAnimationsModule,
      CarouselModule,
      // RouterModule.forRoot([),
      RouterModule.forRoot(appRoutes),
      ReactiveFormsModule,
      FormsModule,
      ModalModule.forRoot(),
      HttpClientModule,
      // https://github.com/kolkov/ngx-gallery
      NgxGalleryModule
   ],
   providers: [
      AuthService,
      AlertifyService,
      ErrorInterceptorProvider,
      UserService,
      MainResolver,
      ManyAuctionsResolver,
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
