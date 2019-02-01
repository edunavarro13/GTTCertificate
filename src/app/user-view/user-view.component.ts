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
  Router
} from '@angular/router';
import {
  NotificationsService
} from 'angular2-notifications';
import {
  GttJiraService
} from '../gtt-jira.service';

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
  verified: number = JSON.parse(localStorage.getItem('verified')) || 0;

  editJira: boolean = false;
  // De password
  editPass: boolean = false;
  usernamePass1: string = "";
  usernamePass2: string = "";

  constructor(private gttApi: GttApiService, private jiraApi: GttJiraService, private routerUser: Router,
    private notification: NotificationsService) {}

  ngOnInit() {
    this.gttApi.permited();
    this.gttApi.getUserById().then((responseUser: User) => {
      this.userActive = responseUser;
    }).catch(console.error);

    this.gttApi.getJiraByUserId().then((response: Jira) => {
      this.jiraActive = response;
      if (this.jiraActive) {
        this.usernameJira = this.jiraActive.username;
        this.passwordJira = this.jiraActive.password;
        this.componentJira = this.jiraActive.component;
        this.proyectJira = this.jiraActive.proyect;
        this.urlJira = this.jiraActive.url;
      }
    }).catch(console.error);
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
        }).catch(console.error);
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
        }).catch(console.error);
      }
    }
  }

  logOut() {
    if (confirm(`¿Estás seguro que quieres cerrar la sesión?`)) {
      localStorage.clear();
      this.routerUser.navigate(['/login']);
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
      this.notification.info('Información', `En Componente de Jira debes introducir el componente tu usuario de Jira.`, {
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
        }).catch(console.error);
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
