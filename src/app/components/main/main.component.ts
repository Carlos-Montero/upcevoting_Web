import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { UserService } from '../../service/user.service';
import { User } from '../../model/user.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {
  private user: User;
  
  constructor(private authService: AuthService, private userService: UserService){}
  
  ngOnInit()  {
      /*
      //decode token
      const id = this.authService.decodeToken(localStorage.getItem('token')).sub; 
      //get user profile
      this.userService.getUser$(id).subscribe(
        data => {
          this.user = data;
        },
        data => {
          console.log(data);
        });*/
    } 
}

  




