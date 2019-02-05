import {
  Component,
  OnInit
} from '@angular/core';
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
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-view',
  templateUrl: './page-view.component.html',
  styleUrls: ['./page-view.component.scss']
})
export class PageViewComponent implements OnInit {

  allCertificates: Array < Certificate > = [];
  userActive: User;
  boolCert: boolean = false;
  columnActive: number = 0;

  constructor(private gttApi: GttApiService,
    private notification: NotificationsService, private router: Router) {}

  ngOnInit() {
    this.gttApi.permited();
    this.gttApi.getAllCertificates().then((result: any) => {
      this.allCertificates = result;
      this.modeOrdenate(0);
    }).catch(console.error);
    this.gttApi.getUserById().then((responseUser: User) => {
      this.userActive = responseUser;
    }).catch(console.error);
  }

  detailButton(idCert: number) {
    this.router.navigate(['/certificate/' + idCert]);
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

  modeOrdenate(type: number) {
    this.columnActive = type;
    this.boolCert = !this.boolCert;
    let asc: boolean = this.boolCert;
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
