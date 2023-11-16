import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';


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
import { CreateProjectComponent } from './pages/create-project/create-project.component';

import { registerLocaleData } from '@angular/common';
import localePT from '@angular/common/locales/pt';
import { MenuIsLoggedComponent } from './components/menu-is-logged/menu-is-logged.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { CardComponent } from './components/card/card.component';

import { ViewProjectDialogComponent } from './components/view-project-dialog/view-project-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';

import { MatButtonModule } from '@angular/material/button';
import { EditButtonComponent } from './components/curriculum-buttons/edit-button.component';

registerLocaleData(localePT);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginFormComponent,
    InputTextComponent,
    InputPasswordComponent,
    InputDateComponent,
    LoadingComponent,    
    MenuHomeIsNotLoggedComponent, 
    MenuIsLoggedComponent, 
    ProfileComponent, 
    ViewProjectDialogComponent, 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    CommonModule,
    CreateProjectComponent,
    SignupComponent,
    SigninComponent,
    CardComponent,
    MatDialogModule,
    MatButtonModule,
    EditButtonComponent
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'pt-br' }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
