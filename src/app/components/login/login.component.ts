import { Component } from '@angular/core';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../service/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})

export class LoginComponent {
  title = 'login';

  constructor(private userService: UserService, private authService: AuthService, private router: Router, private toastr: ToastrService) {
  }

  showSuccessToast(m: string) {
    this.toastr.success(m);
  }

  showErrorToast(m: string) {
    this.toastr.error(m);
  }

  showInfoToast(m: string) {
    this.toastr.info(m);
  }

  signIn(username: string, password: string) {
    const isTokenExpired = this.authService.isTokenExpired();
    if (isTokenExpired) {
      const user = this.userService.signIn$(username, password).subscribe(
        data => {
          const decoded = this.authService.decodeToken(data.token); 
          this.showSuccessToast('User ' + decoded.user + ' has logged in');
          // this.userService.setUserLoggedIn();
          localStorage.setItem('token', data.token);
          this.router.navigate(['home']);
        },
        data => {
          console.log();
          this.showErrorToast('Invalid credentials');
        });
    }
    else {
      this.showInfoToast('User ' + username + ' is already logged in');
      this.router.navigate(['home']);
    }
  }
  
}


