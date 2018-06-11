import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { PollComponent } from './components/poll/poll.component';
import { ProfessorComponent } from './components/professor/professor.component';
import { ProfessorMainComponent } from './components/professorMain/professorMain.component';
import { UserService } from './service/user.service';
import { AuthGuard } from './guard/auth.guard';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { RoutingRoutingModule } from './routing/routing-routing.module';
import { AuthService } from './service/auth.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorHelper } from './interceptor/http-interceptor';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SubjectListComponent } from './components/subject-list/subject-list.component';
import { SubjectComponent } from './components/subject/subject.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    PollComponent,
    ProfessorComponent,
    ProfessorMainComponent,
    NavbarComponent,
    SubjectListComponent,
    SubjectComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    HttpClientModule,
    RoutingRoutingModule
  ],
  providers: [UserService, AuthService, AuthGuard, 
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorHelper,
      multi: true,
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
