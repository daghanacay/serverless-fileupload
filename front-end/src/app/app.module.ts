import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { LoginPageComponent } from './login-page/login-page.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { AuthGuardService } from './services/auth-guard.service';
import { SecurityService } from './services/security.service';
import { ErrorHandlerService } from './services/error-handler.service';
import { SecureHttpClientService } from './services/secure-http-client.service';


const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch:'full' },
  { path: 'login', component: LoginPageComponent },
  { path: 'file-upload', component: FileUploadComponent, canActivate: [AuthGuardService] }  
];

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    FileUploadComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
   AuthGuardService,
   SecurityService,
   SecureHttpClientService,
   {
    provide: ErrorHandler, 
    useClass: ErrorHandlerService
   }
  ],
  bootstrap: [AppComponent]

})
export class AppModule { }
