import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginViewComponent } from './login-view/login-view.component';
import { RegisterViewComponent } from './register-view/register-view.component';
import { PageViewComponent } from './page-view/page-view.component';
import { UserViewComponent } from './user-view/user-view.component';
import { CertificateDetailComponent } from './certificate-detail/certificate-detail.component';
import { PrincipalHeaderComponent } from './principal-header/principal-header.component';
import { GttApiService } from './gtt-api.service';
import { GttJiraService } from './gtt-jira.service';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    LoginViewComponent,
    RegisterViewComponent,
    PageViewComponent,
    UserViewComponent,
    CertificateDetailComponent,
    PrincipalHeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SimpleNotificationsModule.forRoot(),
    BrowserAnimationsModule,
    NoopAnimationsModule
  ],
  providers: [GttApiService, GttJiraService],
  bootstrap: [AppComponent]
})
export class AppModule { }
