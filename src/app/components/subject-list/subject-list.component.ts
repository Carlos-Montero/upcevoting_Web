import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { SubjectVote } from '../../models/subject-vote.model';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-subject-list', 
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.css']
})
export class SubjectListComponent implements OnInit {
  @Input() data: User;
  private user: User;
  
  constructor () { }

  ngOnInit() {
    
  }

  ngOnChanges(changes: SimpleChanges) {
    // only run when property "data" changed
    if (changes['data']) {
        this.user = this.data;
        console.log(this.user);
    }
}

}
