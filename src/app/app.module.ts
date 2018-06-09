import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {Routes, RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import {LoginComponent} from './login/login.component';
import {MainComponent} from './main/main.component';
import {PollComponent} from './poll/poll.component';
import { ProfessorComponent } from './professor/professor.component';
import { UserService } from './service/user.service';


const appRoutes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'main', component: MainComponent},
  {path: 'poll', component: PollComponent},
  {path: 'professor', component: ProfessorComponent},
]


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    PollComponent,
    ProfessorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
