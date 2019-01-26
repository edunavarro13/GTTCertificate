import {
  Component
} from '@angular/core';
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
  selector: 'app-register-view',
  templateUrl: './register-view.component.html',
  styleUrls: ['./register-view.component.scss']
})
export class RegisterViewComponent {

  usernameRegister: string = '';
  passRegister: string = '';
  confRegister: string = '';
  constructor(private apiService: GttApiService, private routeAtr: Router, private notification: NotificationsService) {}

  register() {
    if (this.usernameRegister.trim() !== '' && this.passRegister.trim() !== '' && this.confRegister.trim()) {
      if (this.passRegister.trim() === this.confRegister.trim()) {
        this.apiService.register(this.usernameRegister.trim(), this.passRegister.trim())
          .then(response => {
            this.notification.success('SUCCESS!', `Your user ${this.usernameRegister} is registered.`, {
              timeOut: 3000,
              showProgressBar: true,
              pauseOnHover: true,
              clickToClose: true
            });
          }).catch(errmes => this.notification.error('¡ERROR!', errmes, {
            timeOut: 3000,
            showProgressBar: true,
            pauseOnHover: true,
            clickToClose: true
          }));
      } else {
        this.notification.error('¡ERROR!', `Contraseña y confirmación de la contraseña no son iguales.`, {
          timeOut: 3000,
          showProgressBar: true,
          pauseOnHover: true,
          clickToClose: true
        });
      }
    } else {
      this.notification.error('¡ERROR!', `Usuario, contraseña y confirmación de la contraseña no pueden estar vacíos.`, {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true
      });
    }
  }

  infoButton(option: number) {
    if (option === 1) {
      this.notification.info('Información', `En Usuario debes introducir el nombre de usuario con el que te has registrado.`, {
        timeOut: 5000,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true
      });
    } else if (option === 2) {
      this.notification.info('Información', `En Contraseña debes introducir la contraseña que elegiste al registrar tu usuario.`, {
        timeOut: 5000,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true
      });
    } else if (option === 3) {
      this.notification.info('Información', `En Confirmación contraseña debes introducir la misma contraseña que pusiste en Contraseña.`, {
        timeOut: 5000,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true
      });
    }
  }

}
