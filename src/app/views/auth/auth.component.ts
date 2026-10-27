import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private route: Router
  ) { }
  
  ngOnInit() {
    let sessionData = this.authService.sessionData;
    if(sessionData) {
      this.route.navigate(['/']);
    } else {
      this.route.navigate(['auth']);
    }
  }
}
