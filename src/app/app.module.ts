import { MatRadioModule } from '@angular/material/radio';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';

import { MatCardModule } from '@angular/material/card';
import { SigninComponent } from './pages/signin/signin.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { LoginFormComponent } from './widgets/login-form/login-form.component';
import { InputTextComponent } from './components/input-text/input-text.component';
import { InputPasswordComponent } from './components/input-password/input-password.component';
import { InputDateComponent } from './components/input-date/input-date.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoadingComponent } from './components/loading/loading.component';
import { MenuHomeIsNotLoggedComponent } from './components/menu-home-is-not-logged/menu-home-is-not-logged.component';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    HeaderComponent,
    FooterComponent,
    LoginFormComponent,
    InputTextComponent,
    InputPasswordComponent,
    InputDateComponent,
    SignupComponent,
    LoadingComponent,    
    MenuHomeIsNotLoggedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    MatCardModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatSelectModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
