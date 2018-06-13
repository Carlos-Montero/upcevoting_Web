import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class SubjectListService {

  
  public bSubject = new BehaviorSubject('POLL');
  constructor() { }

  passSubjectName(name) { //Send the data throught subject
     this.bSubject.next(name);
  }

}
