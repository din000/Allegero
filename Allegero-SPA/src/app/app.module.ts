import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './_services/auth.service';
import { NavComponent } from './nav/nav.component';
import { ResponsikComponent } from './responsywny_leyout/responsik/responsik.component';
import { Responsik2Component } from './responsik2/responsik2.component';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';



@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      ResponsikComponent,
      Responsik2Component,
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      NgbModule,
      BrowserAnimationsModule,
      CarouselModule,
      RouterModule.forRoot([]),

   ],
   providers: [
      AuthService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
