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

  userActive: User;
  usernameJira: string = "";
  passwordJira: string = "";
  componentJira: string = "";
  proyectJira: string = "";
  urlJira: string = "";
  jiraToCreate: Jira;

  editJira: boolean = false;

  constructor(private gttApi: GttApiService, private routerUser: Router, private notification: NotificationsService) {
    this.jiraToCreate = {
      id: 0,
      username: '',
      password: '',
      component: '',
      proyect: '',
      url: ''
    };
  }

  ngOnInit() {
    this.gttApi.permited();
    this.gttApi.getUserById().then((response: User) => {
      this.userActive = response;
    }).catch(console.error);
    
    if (this.userActive.user_jira !== null) {
      this.usernameJira = this.userActive.user_jira.username;
      this.passwordJira = this.userActive.user_jira.password;
      this.componentJira = this.userActive.user_jira.component;
      this.proyectJira = this.userActive.user_jira.proyect;
      this.urlJira = this.userActive.user_jira.url;
    } else {
      this.jiraToCreate = this.userActive.user_jira;
    }
  }

  addNewJira() {
    console.log(this.userActive);
    this.jiraToCreate.username = this.usernameJira;
    this.jiraToCreate.password = this.passwordJira;
    this.jiraToCreate.url = this.urlJira;
    this.jiraToCreate.proyect = this.proyectJira;
    this.jiraToCreate.component = this.componentJira;
    this.userActive.user_jira = this.jiraToCreate;
    // No hace falta hacer nada mas que el update, ahi se crea en el backend
    // Y es un void, asi que no entra ni en then ni en catch
    this.gttApi.updateUser(this.userActive).then(res => {console.log(res)}).catch(console.error);
    this.notification.success('¡Éxito!', `El usuario de Jira ${this.usernameJira} ha sido enlazado con tu usuario.`, {
      timeOut: 3000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true
    });
  }

  logOut() {
    if (confirm(`Are you sure you want to Log out?`)) {
      localStorage.clear();
      this.routerUser.navigate(['/login']);
    }
  }

}
