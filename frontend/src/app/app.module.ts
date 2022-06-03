import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from './services/http.service';
import { AuthenticationService } from './services/authentication.service';
import { ProfileComponent } from './pages/profile/profile.component';
import { AuthGuard } from './guards/auth.guard';
import { LoaderComponent } from './components/loader/loader.component';
import { OutsideDirective } from './directives/outside.directive';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ImageCropperComponent } from './components/image-cropper/image-cropper.component';
import { FileDropComponent } from './components/file-drop/file-drop.component';
import { NgxFileHelpersModule } from 'ngx-file-helpers';
import { DeveloperComponent } from './pages/developer/developer.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    ProfileComponent,
    LoaderComponent,
    OutsideDirective,
    ImageCropperComponent,
    FileDropComponent,
    DeveloperComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      preventDuplicates: true,
      positionClass: 'toast-position'
    }),
    HttpClientModule,
    ImageCropperModule,
    NgxFileHelpersModule
  ],
  providers: [
    HttpService,
    AuthenticationService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
