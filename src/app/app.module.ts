import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {Routes, RouterModule} from '@angular/router';
import { AppComponent } from './app.component';
import {LoginComponent} from './login/login.component';
import {MainComponent} from './main/main.component';
import {PollComponent} from './poll/poll.component';
import { ProfessorComponent } from './professor/professor.component';
import { ProfessorMainComponent } from './professorMain/professorMain.component';
import { UserService } from './service/user.service';
import { AuthGuard } from './auth.guard';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { RoutingRoutingModule } from './routing/routing-routing.module';
import { AuthService } from './service/auth.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorHelper } from './interceptor/http-interceptor';


const appRoutes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'main', component: MainComponent},
  {path: 'poll', component: PollComponent},
  {path: 'professor', component: ProfessorComponent},
  {path: 'professorMain', component: ProfessorMainComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    PollComponent,
    ProfessorComponent,
    ProfessorMainComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
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
