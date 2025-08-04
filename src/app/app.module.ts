import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';  // Import ReactiveFormsModule
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';  // Import FormsModule

// Used to create fake backend (commented out for now)
import { fakeBackendProvider } from './_helpers';

import { AppRoutingModule } from './app-routing.module';
import { JwtInterceptor, ErrorInterceptor, appInitializer } from './_helpers';
import { AccountService } from './_services';
import { AppComponent } from './app.component';
import { AlertComponent } from './_components';
import { HomeComponent } from './home';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TeacherListComponent } from './teacher-list/teacher-list.component';  // Import the Teacher List component
import { TeacherService } from './teacher.service'; // Import the Teacher service

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,  // Enables reactive forms
    HttpClientModule,  // Enables HTTP requests
    FormsModule,  // Enables two-way data binding with ngModel
    AppRoutingModule  // Routing for the application
  ],
  declarations: [
    AppComponent,
    AlertComponent,
    HomeComponent,
    DashboardComponent,
    TeacherListComponent,  // Declare the Teacher List component
  ],
  providers: [
    { provide: APP_INITIALIZER, useFactory: appInitializer, multi: true, deps: [AccountService] },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // Provider used to create fake backend (uncomment this if using a fake backend)
    // fakeBackendProvider,

    TeacherService,  // Add TeacherService to providers to be injected in the app
  ],
  bootstrap: [AppComponent]  // Bootstrap the root component
})
export class AppModule { }
