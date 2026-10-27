import { Component } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { AuthService } from './core/services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'bill';
  @BlockUI() blockUI: NgBlockUI;

  constructor(private authService: AuthService) {
    //console.log('this.blockUI', this.blockUI)
    // this.blockUI.start('Loading...'); // Start blocking

    // setTimeout(() => {
    //   this.blockUI.stop(); // Stop blocking
    // }, 2000);
  }

  ngOnInit() {
    let context = this;
    window.addEventListener("beforeunload", function (e) {
      let currentUser = JSON.parse(localStorage.getItem('sessionData'));
      if (currentUser) {
        //context.logoutOnClose();
      }
    });
  }

  logoutOnClose() {
    this.authService.logout();
  }
}
