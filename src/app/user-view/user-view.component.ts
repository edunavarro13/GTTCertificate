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

  editJira: boolean = false;

  constructor(private gttApi: GttApiService, private routerUser: Router, 
    private notification: NotificationsService) {
  }

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

  addNewJira() {
    if(!this.jiraActive) {            
      this.jiraActive = {
        id: undefined,
        username: this.usernameJira,
        password: this.passwordJira,
        url: this.urlJira,
        proyect: this.proyectJira,
        component: this.componentJira,
        idUser: 0
      };
      this.gttApi.addJira(this.jiraActive).then((res: any) => {
        if(res.status === 200) {
          this.notification.success('¡Éxito!', `El usuario de Jira ${this.usernameJira} ha sido enlazado con tu usuario.`, {
            timeOut: 3000,
            showProgressBar: true,
            pauseOnHover: true,
            clickToClose: true
          });
        }
        else {
          this.notification.error('¡ERROR!', res.message, {
            timeOut: 3000,
            showProgressBar: true,
            pauseOnHover: true,
            clickToClose: true
          });
        }
      }).catch(console.error);
    }
    else {   
      this.jiraActive.username = this.usernameJira;
      this.jiraActive.password = this.passwordJira;
      this.jiraActive.url = this.urlJira;
      this.jiraActive.proyect = this.proyectJira;
      this.jiraActive.component = this.componentJira;
      this.gttApi.updateJira(this.jiraActive).then((res: any) => {
        if(res.status === 200) {
          this.notification.success('¡Éxito!', `El usuario de Jira ${this.usernameJira} ha sido modificado con éxito.`, {
            timeOut: 3000,
            showProgressBar: true,
            pauseOnHover: true,
            clickToClose: true
          });
        }
        else {
          this.notification.error('¡ERROR!', res.message, {
            timeOut: 3000,
            showProgressBar: true,
            pauseOnHover: true,
            clickToClose: true
          });
        }
      }).catch(console.error);
    }
    this.editJira = false;
  }

  logOut() {
    if (confirm(`Are you sure you want to Log out?`)) {
      localStorage.clear();
      this.routerUser.navigate(['/login']);
    }
  }

}
