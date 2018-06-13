import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent, HttpEventType } from '@angular/common/http';
import { User } from '../models/user.model';
import {Observable} from "rxjs";
import {SubjectVote} from "../models/subject-vote.model";
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import { map } from 'rxjs/operators/map';



const url = 'http://localhost:3000/users';

@Injectable()
export class UserService {
  public token: any;
  public user;
  
  constructor(private http: HttpClient) { }
  
  getUser$(id: number): Observable<User> {
    return this.http.get<User>(url + '/' + id);
  }
  
  signIn$(username: string, password: string): Observable<any> {
    return this.http.post<any>(url + '/signin', { username, password });
  }

  getSubjects$(username: string) {
    //return this.http.get<Subject[]>(url + '/getSubjects', username);
  }

  vote$(name: string, concepts: string, difficulty: string, materials: string, relation: string, professor: string): Observable<any> {
    const tmp = { 
      "name" : name,
      "professor" : Number(professor),
      "concepts" : Number(concepts),
      "difficulty" : Number(difficulty),
      "relation" : Number(relation),
      "materials" : Number(materials)
    };

    return this.http.post<any>(url + '/vote', tmp);
  } 

  sendBKpub$(BKpub: string): Observable<any> {
    return this.http.post<any>(url + '/sendBKpub', { BKpub });
  }
    
  

}
