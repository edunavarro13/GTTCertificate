import {
  Component,
  OnInit
} from '@angular/core';
import {
  GttApiService
} from '../gtt-api.service';
import {
  User,
  Jira
} from '../models.interface';
import {
  NotificationsService
} from 'angular2-notifications';
import {
  GttJiraService
} from '../gtt-jira.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss']
})
export class UserViewComponent implements OnInit {

  jiraActive: Jira;
  userActive: User;
  usernameJira: string = "";
  passwordJira: string = "";
  componentJira: string = "";
  proyectJira: string = "";
  urlJira: string = "";
  descJira: string = "";
  roleJira: number = 0;
  verified: number = JSON.parse(localStorage.getItem('verified')) || 0;

  editJira: boolean = false;
  // De password
  editPass: boolean = false;
  usernamePass1: string = "";
  usernamePass2: string = "";

  constructor(private gttApi: GttApiService, private jiraApi: GttJiraService,
    private notification: NotificationsService, private routeAtr: Router) {}

  ngOnInit() {
    this.gttApi.getUserById().then((responseUser: User) => {
      this.userActive = responseUser;
    }).catch(res => {
      if(res.status === 401) {
        this.routeAtr.navigate(['/login']);
      }
      else if(res.status === 504) {
        console.error(res);
        this.notification.error('¡ERROR!', 'No se ha podido conectar al servidor. Vuelve a intentarlo más tarde.', {
          timeOut: 3000,
          showProgressBar: true,
          pauseOnHover: true,
          clickToClose: true
        });
      } 
      else {
        console.error(res);
      }
    });

    this.gttApi.getJiraByUserId().then((response: Jira) => {
      this.jiraActive = response;
      if (this.jiraActive) {
        this.usernameJira = this.jiraActive.username;
        this.passwordJira = this.jiraActive.password;
        this.componentJira = this.jiraActive.component;
        this.proyectJira = this.jiraActive.proyect;
        this.urlJira = this.jiraActive.url;
        this.descJira = this.jiraActive.descripcion;
      }
    }).catch((res2: any) => {
      if(res2.status === 401) {
        this.routeAtr.navigate(['/login']);
      } else {
        console.error(res2);
      }
    });
  }

  convertPass() {
    if (this.jiraActive) {
      let asterisc = "";
      for (let i = 0; i < this.jiraActive.password.length; i++) {
        asterisc += '*';
      }
      return asterisc;
    }
    return "";
  }

  addNewJira() {
    // Ningun campo puede estar vacio, si no salta un error
    if (!this.usernameJira || !this.passwordJira || !this.urlJira || !this.proyectJira || !this.componentJira) {
      this.notification.error('¡ERROR!', "Ninguno de los campos pueden estar vacíos", {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true
      });
    } else {
      let jiraActiveAux: Jira = undefined;
      jiraActiveAux = {
        id: undefined,
        username: this.usernameJira,
        password: this.passwordJira,
        url: this.urlJira,
        proyect: this.proyectJira,
        component: this.componentJira,
        descripcion: this.descJira,
        issue: this.roleJira,
        idUser: 0
      };
      if (!this.jiraActive) {
        this.gttApi.addJira(jiraActiveAux).then((res: any) => {
          if (res.status === 200) {
            this.jiraActive = jiraActiveAux;
            this.editJira = false;
            this.notification.success('¡Éxito!', `El usuario de Jira ${this.usernameJira} ha sido enlazado con tu usuario.`, {
              timeOut: 3000,
              showProgressBar: true,
              pauseOnHover: true,
              clickToClose: true
            });
            this.verified = 0;
          } else {
            this.notification.error('¡ERROR!', res.message, {
              timeOut: 3000,
              showProgressBar: true,
              pauseOnHover: true,
              clickToClose: true
            });
          }
        }).catch(res => {
          if(res.status === 401) {
            this.routeAtr.navigate(['/login']);
          } else {
            console.error(res);
          }
        });
      } else {
        this.gttApi.updateJira(jiraActiveAux).then((res: any) => {
          if (res.status === 200) {
            this.jiraActive = jiraActiveAux;
            this.editJira = false;
            this.notification.success('¡Éxito!', `El usuario de Jira ${this.usernameJira} ha sido modificado con éxito.`, {
              timeOut: 3000,
              showProgressBar: true,
              pauseOnHover: true,
              clickToClose: true
            });
            this.verified = 0;
          } else {
            this.notification.error('¡ERROR!', res.message, {
              timeOut: 3000,
              showProgressBar: true,
              pauseOnHover: true,
              clickToClose: true
            });
          }
        }).catch(res2 => {
          if(res2.status === 401) {
            this.routeAtr.navigate(['/login']);
          } else {
            console.error(res2);
          }
        });
      }
    }
  }

  infoButton(option: number) {
    if (option === 1) {
      this.notification.info('Información', `En Usuario de Jira debes introducir el nombre de usuario que usas en Jira.`, {
        timeOut: 5000,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true
      });
    } else if (option === 2) {
      this.notification.info('Información', `En Contraseña de Jira debes introducir la contraseña que elegiste en Jira.`, {
        timeOut: 5000,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true
      });
    } else if (option === 3) {
      this.notification.info('Información', `En Componente de Jira debes introducir el equipo que va a recibir la tarea de Jira.`, {
        timeOut: 5000,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true
      });
    } else if (option === 4) {
      this.notification.info('Información', `En Proyecto de Jira debes introducir el proyecto donde se creará una tarea cuando un certificado caduque.`, {
        timeOut: 5000,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true
      });
    } else if (option === 5) {
      this.notification.info('Información', `En Url de Jira debes introducir la url de tu usuario de Jira.`, {
        timeOut: 5000,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true
      });
    } else if (option === 6) {
      this.notification.info('Información', `Este icono verifica que el usuario de Jira introducido existe.`, {
        timeOut: 5000,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true
      });
    } else if (option === 7) {
      this.notification.info('Información', `En contraseña debes introducir la nueva contraseña que quieras tener.`, {
        timeOut: 5000,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true
      });
    } else if (option === 8) {
      this.notification.info('Información', `En confirmación de la contraseña debes introducir el mismo valor que en contraseña.`, {
        timeOut: 5000,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true
      });
    }
    else if (option === 9) {
      this.notification.info('Información', `Tipo de tarea es el tipo que tendrá la tarea de Jira cuando se suba (siempre será Explotación).`, {
        timeOut: 5000,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true
      });
    }
    else if (option === 10) {
      this.notification.info('Información', `En descripción de Jira debes introducir la información en detalle que tendrá la tarea de Jira cuando se suba.`, {
        timeOut: 5000,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true
      });
    }
  }

  confirmUser() {
    this.jiraApi.verifiedUser(this.jiraActive.username, this.jiraActive.password).then(response => {
      this.verified = 1;
      localStorage.setItem('verified', JSON.stringify(1));
      this.notification.success('¡Confirmado!', `El usuario de Jira ${this.jiraActive.username} se puede conectar con éxito.`, {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true
      });
    }).catch(errmes => this.notification.error('¡ERROR!', `El usuario de Jira ${this.jiraActive.username} no se ha podido conectar.`, {
      timeOut: 3000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true
    }));
  }

  editUser() {
    // Ningun campo puede estar vacio
    if (this.usernamePass1.trim() && this.usernamePass2.trim()) {
      if (this.usernamePass1.trim() === this.usernamePass2.trim()) {
        this.userActive.password = this.usernamePass1;
        this.gttApi.updateUser(this.userActive).then(response => {
          this.notification.success('¡Éxito!', `El usuario ${this.userActive.username} se ha modificado correctamente.`, {
            timeOut: 3000,
            showProgressBar: true,
            pauseOnHover: true,
            clickToClose: true
          });
        }).catch(res => {
          if(res.status === 401) {
            this.routeAtr.navigate(['/login']);
          } else {
            console.error(res);
          }
        });
        this.editPass = false;
      }
      else {
        this.notification.error('¡ERROR!', "La contraseña y la confirmación de la contraseña no coinciden.", {
          timeOut: 3000,
          showProgressBar: true,
          pauseOnHover: true,
          clickToClose: true
        });
      }
    } else {
      this.notification.error('¡ERROR!', "Ninguno de los campos pueden estar vacíos.", {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true
      });
    }
  }
}
