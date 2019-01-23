import { Component } from '@angular/core';
import {
  GttApiService
} from '../gtt-api.service';
import {
  Router
} from '@angular/router';
import {
  NotificationsService
} from 'angular2-notifications';

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.scss']
})
export class LoginViewComponent {

  usernameLogin: string = '';
  passLogin: string = '';
  constructor(private apiService: GttApiService, private routerLog: Router, private notification: NotificationsService) {}

  login() {
    if (this.usernameLogin.trim() !== '' && this.passLogin.trim() !== '') {
      this.apiService.login(this.usernameLogin.trim(), this.passLogin.trim()).then(response => {
        this.routerLog.navigate(['/trello']);
      }).catch(errmes => this.notification.error('ERROR!', errmes, {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true
      }));
    } else {
      this.notification.error('ERROR!', `Username and password can not be empty.`, {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true
      });
    }
  }

}
