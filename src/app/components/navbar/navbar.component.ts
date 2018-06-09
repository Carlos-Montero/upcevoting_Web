import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
  }

  showInfoToast(m: string) {
    this.toastr.info(m);
  }

  onLogOut() {
    const username = localStorage.getItem('username');
    localStorage.clear();
    this.router.navigate(['/signin']);
    this.showInfoToast('User ' + username + ' has logged out');
  }

}
