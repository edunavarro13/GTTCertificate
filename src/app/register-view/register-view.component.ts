import {
  Component, OnInit
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
export class RegisterViewComponent implements OnInit {

  usernameRegister: string = '';
  passRegister: string = '';
  confRegister: string = '';
  roleRegister: number = 1;
  constructor(private apiService: GttApiService, private routeAtr: Router, private notification: NotificationsService) {}

  ngOnInit() {
    this.apiService.permited();
  }
  register() {
    if (this.usernameRegister.trim() !== '' && this.passRegister.trim() !== '' && this.confRegister.trim()) {
      if (this.passRegister.trim() === this.confRegister.trim()) {
        this.apiService.register(this.usernameRegister.trim(), this.passRegister.trim(), this.roleRegister)
          .then((response: any) => {
            if (response.status === 200) {
              this.notification.success('¡Éxito!', `Tu usuario ${this.usernameRegister} ha sido registrado satisfactoriamente.`, {
                timeOut: 3000,
                showProgressBar: true,
                pauseOnHover: true,
                clickToClose: true
              });
            } else {
              this.notification.error('¡ERROR!', response.message, {
                timeOut: 3000,
                showProgressBar: true,
                pauseOnHover: true,
                clickToClose: true
              })
            }
          }).catch(console.error);
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
    else if (option === 4) {
      this.notification.info('Información', `En Rol de usuario debes elegir si quieres que el usuario tenga permisos de edición de certificados (Admin) o solo de lectura (User).`, {
        timeOut: 5000,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true
      });
    }
  }

}
