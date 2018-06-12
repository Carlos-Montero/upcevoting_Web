import {Component, OnInit, Input, SimpleChanges} from '@angular/core';
import { SubjectListService } from '../../service/subject-list.service';
import { UserService } from '../../service/user.service';
import { SubjectVote } from '../../models/subject-vote.model';

const HELLO = 'hello';
@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.css']
})
export class PollComponent implements OnInit{
  
 private subject: any;
  
 constructor(private subjectListService: SubjectListService, private userService: UserService) {
    
 }
   
  vote(name, concepts, difficulty, materials, relation, teacher) {
    this.userService.vote$(this.subject, teacher, concepts, difficulty, materials, relation);
  }

  ngOnInit() {
    this.subjectListService.bSubject.subscribe(
      data => {
        this.subject = data;
        console.log(this.subject);
      },
      data => {
        console.log(data);
      }); 
  }

 
}





