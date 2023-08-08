import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './signin/signin.component';
import { IndexComponent } from './index/index.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

import { MatCardModule } from '@angular/material/card';
import { Component } from '@angular/core';

// @NgModule({
//   declarations: [
//     AppComponent
//   ],
//   selector: 'menu-overview-example',
//   templateUrl: 'menu-overview-example.html',
//   standalone: true,
//   imports: [
//     BrowserModule,
//     AppRoutingModule,
//     BrowserAnimationsModule,
//     MatButtonModule,
//     MatMenuModule
//   ],
//   providers: [],
//   bootstrap: [AppComponent]
// })

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    IndexComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class CardOverviewExample { }
