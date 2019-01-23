import { Component } from '@angular/core';
import {
  GttApiService
} from '../gtt-api.service';
import {
  Router
} from '@angular/router';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-register-view',
  templateUrl: './register-view.component.html',
  styleUrls: ['./register-view.component.scss']
})
export class RegisterViewComponent {

  usernameRegister: string = '';
  passRegister: string = '';
  constructor(private apiService: GttApiService, private routeAtr: Router, private notification: NotificationsService) {}

  register() {    
    if (this.usernameRegister.trim() !== '' && this.passRegister.trim() !== '') {      
      this.apiService.register(this.usernameRegister.trim(), this.passRegister.trim())
        .then(response => {
          this.notification.success('SUCCESS!', `Your user ${this.usernameRegister} is registered.`, {
            timeOut: 3000,
            showProgressBar: true,
            pauseOnHover: true,
            clickToClose: true
          });
        }).catch(errmes => this.notification.error('ERROR!', errmes, {
          timeOut: 3000,
          showProgressBar: true,
          pauseOnHover: true,
          clickToClose: true
        }));
    }
    else {
      this.notification.error('ERROR!', `Username and password can not be empty.`, {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true
      });
    }
  }

}
