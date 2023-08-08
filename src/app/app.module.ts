import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './signin/signin.component';
import { IndexComponent } from './index/index.component';


import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    IndexComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatCardModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
