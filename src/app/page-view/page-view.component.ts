import {
  Component,
  OnInit
} from '@angular/core';
import {
  Router
} from '@angular/router';
import {
  GttApiService
} from '../gtt-api.service';
import {
  Certificate,
  User
} from '../models.interface';
import {
  NotificationsService
} from 'angular2-notifications';

@Component({
  selector: 'app-page-view',
  templateUrl: './page-view.component.html',
  styleUrls: ['./page-view.component.scss']
})
export class PageViewComponent implements OnInit {

  allCertificates: Array < Certificate > = [];
  userActive: User;

  constructor(private routerLog: Router, private gttApi: GttApiService,
    private notification: NotificationsService) {}

  ngOnInit() {
    this.gttApi.permited();
    this.gttApi.getAllCertificates().then((result: any) => {
      this.allCertificates = result;
      this.modeOrdenate(0, true);
    }).catch(console.error);
    this.gttApi.getUserById().then((responseUser: User) => {
      this.userActive = responseUser;
    }).catch(console.error);
  }

  logOut() {
    if (confirm(`¿Estás seguro que quieres cerrar la sesión?`)) {
      localStorage.clear();
      this.routerLog.navigate(['/login']);
    }
  }

  detailButton() {
    if (this.userActive.role === 0) {

    } else {
      this.notification.error('¡ERROR!', "No tienes la autorización necesaria para modificar los certificados.", {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true
      });
    }
  }

  deleteButton() {
    if (this.userActive.role === 0) {

    } else {
      this.notification.error('¡ERROR!', "No tienes la autorización necesaria para marcar como eliminados los certificados.", {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true
      });
    }
  }

  modeOrdenate(type: number, asc: boolean) {
    this.allCertificates.sort(function (a, b) {
      if (type === 0) {
        if ((asc && a.alias > b.alias) || (!asc && a.alias < b.alias)) {
          return 1;
        }
        if ((!asc && a.alias > b.alias) || (asc && a.alias < b.alias)) {
          return -1;
        }
        // a must be equal to b
        return 0;
      } else if (type === 1) {
        if ((asc && a.caducidad > b.caducidad) || (!asc && a.caducidad < b.caducidad)) {
          return 1;
        }
        if ((!asc && a.caducidad > b.caducidad) || (asc && a.caducidad < b.caducidad)) {
          return -1;
        }
        // a must be equal to b
        return 0;
      } else if (type === 2) {
        if ((asc && a.id_orga > b.id_orga) || (!asc && a.id_orga < b.id_orga)) {
          return 1;
        }
        if ((!asc && a.id_orga > b.id_orga) || (asc && a.id_orga < b.id_orga)) {
          return -1;
        }
        // a must be equal to b
        return 0;
      } else {
        if ((asc && a.cliente > b.cliente) || (!asc && a.cliente < b.cliente)) {
          return 1;
        }
        if ((!asc && a.cliente > b.cliente) || (asc && a.cliente < b.cliente)) {
          return -1;
        }
        // a must be equal to b
        return 0;
      }
    });
  }
}
