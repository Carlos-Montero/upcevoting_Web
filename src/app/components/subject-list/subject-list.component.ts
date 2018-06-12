import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { SubjectVote } from '../../models/subject-vote.model';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';
import { SubjectListService } from '../../service/subject-list.service';

@Component({
  selector: 'app-subject-list', 
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.css']
})
export class SubjectListComponent implements OnInit {
  @Input() data: string[];
  private subjects: string[];
  
  constructor (private router: Router, private subjectListService: SubjectListService) { }

  ngOnInit() {
    
  }

  ngOnChanges(changes: SimpleChanges) {
    // only run when property "data" changed
    if (changes['data']) {
        this.subjects = this.data;
    }
  }

  goToPoll(subject) {
    this.subjectListService.passSubjectName(subject);
    this.router.navigate(['poll']);
  }



}
