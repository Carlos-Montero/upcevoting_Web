import { Component, OnInit, Output } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { UserService } from '../../service/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {
  private user: User;
  private subjects: string[];
  constructor(private authService: AuthService, private userService: UserService){}
  
  ngOnInit()  {
    const isTokenExpired = this.authService.isTokenExpired(); 
        //decode token
    const id = this.authService.decodeToken(localStorage.getItem('token')).sub; 
    //get user profile
    this.userService.getUser$(id).subscribe(
      data => {
        this.user = data;
        this.subjects = data.subjects;
        console.log('got the user! ');
      },
      data => {
        console.log(data);
      });  
  }
      
}

  




