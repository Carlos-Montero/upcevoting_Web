import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from '../components/login/login.component';
import {MainComponent} from '../components/main/main.component';
import { AuthGuard } from '../guard/auth.guard';
import { PollComponent } from '../components/poll/poll.component';
import { ProfessorComponent } from '../components/professor/professor.component';
import { ProfessorMainComponent } from '../components/professorMain/professorMain.component';

const routes: Routes = [
  { path: '', redirectTo: '/signin', pathMatch: 'full' },
  { path: 'signin',           component: LoginComponent },
  { path: 'home',             component: MainComponent, canActivate: [AuthGuard] },
  { path: 'poll',             component: PollComponent },
  { path: 'professor',        component: ProfessorComponent },
  { path: 'professorMain',    component: ProfessorMainComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingRoutingModule { }
