import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent, HttpEventType } from '@angular/common/http';
import { User } from '../model/user.model';
import {Observable} from "rxjs";
import {Subject} from "../model/subject.model";


const url = 'users';

@Injectable()
export class UserService {

  public token: any;
  public user;
  constructor(private http: HttpClient) { }

  signIn$(username: string, password: string): Observable<any> {
    return this.http.post<any>(url + '/signin', { username, password });
  }

  getSubjects$(username: string) {
    return this.http.get<Subject[]>(url + '/getSubjects', username);
  }

}
