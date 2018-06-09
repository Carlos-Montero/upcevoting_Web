import { Component } from '@angular/core';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-root',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})

export class LoginComponent {
  title = 'login';

  constructor(private userService: UserService, private router: Router, private toastr: ToastrService) {
  }

  showSuccessToast(m: string) {
    this.toastr.success(m);
  }

  showErrorToast(m: string) {
    this.toastr.error(m);
  }

  signIn(username: string, password: string) {
    this.userService.signIn$(username, password).subscribe(
      data => {
        this.showSuccessToast('User ' + username + ' Logged In');

        // this.userService.setUserLoggedIn();
        localStorage.setItem('username', data.username);
        localStorage.setItem('userId', data.userId);
        localStorage.setItem('token', data.token);
        this.router.navigate(['home']);
      },
      data => {
        console.log();
        this.showErrorToast('Invalid credentials');
      });
  }
  

}


