import { Component, OnInit, Input } from '@angular/core';
import { SubjectVote } from '../../models/subject-vote.model';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {
  @Input() subject: string;
  constructor() { }

  ngOnInit() {
  }

}
