import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './_services/auth.service';
import { NavComponent } from './nav/nav.component';
import { ResponsikComponent } from './responsywny_leyout/responsik/responsik.component';




@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      ResponsikComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule
   ],
   providers: [
      AuthService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
