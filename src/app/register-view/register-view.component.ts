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
import { AuxiliarsService } from '../auxiliars.service';

@Component({
  selector: 'app-register-view',
  templateUrl: './register-view.component.html',
  styleUrls: ['./register-view.component.scss']
})
export class RegisterViewComponent {

  usernameRegister: string = '';
  passRegister: string = '';
  confRegister: string = '';
  roleRegister: number = 1;
  constructor(private apiService: GttApiService, private auxiliarService: AuxiliarsService,
    private routeAtr: Router, private notification: NotificationsService) {}

  register() {
    if (this.usernameRegister.trim() !== '' && this.passRegister.trim() !== '' && this.confRegister.trim()) {
      if (this.passRegister.trim() === this.confRegister.trim()) {
        this.apiService.register(this.usernameRegister.trim(), this.passRegister.trim(), this.roleRegister)
          .then((response: any) => {
            if (response.status === 200) {
              this.notification.success('¡Éxito!', `Tu usuario ${this.usernameRegister} ha sido registrado satisfactoriamente.`, this.auxiliarService.getNotificationError());
            } else {
              this.notification.error('¡ERROR!', response.message, this.auxiliarService.getNotificationError())
            }
          }).catch(res => {
            if(res.status === 401) {
              this.routeAtr.navigate(['/login']);
            } else {
              console.error(res);
            }
          });
      } else {
        this.notification.error('¡ERROR!', `Contraseña y confirmación de la contraseña no son iguales.`, this.auxiliarService.getNotificationError());
      }
    } else {
      this.notification.error('¡ERROR!', `Usuario, contraseña y confirmación de la contraseña no pueden estar vacíos.`, this.auxiliarService.getNotificationError());
    }
  }

  infoButton(option: number) {
    this.auxiliarService.infoButton(option, this.notification);
  }

}
