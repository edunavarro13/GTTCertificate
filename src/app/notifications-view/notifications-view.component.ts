import { Component, OnInit } from '@angular/core';
import { GttApiService } from '../gtt-api.service';
import { NotificationsService } from 'angular2-notifications';
import { Certificate, User } from '../models.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notifications-view',
  templateUrl: './notifications-view.component.html',
  styleUrls: ['./notifications-view.component.scss']
})
export class NotificationsViewComponent implements OnInit {

  allCertificates: Array < Certificate > = [];
  userActive: User;

  constructor(private gttApi: GttApiService,
    private notification: NotificationsService, private router: Router) { }

  ngOnInit() {
    this.loadGrid();
    this.gttApi.getUserById().then((responseUser: User) => {
      this.userActive = responseUser;
    }).catch(res => {
      if (res.status === 401) {
        this.router.navigate(['/login']);
      } else if (res.status === 504) {
        console.error(res);
        this.notification.error('¡ERROR!', 'No se ha podido conectar al servidor. Vuelve a intentarlo más tarde.', {
          timeOut: 3000,
          showProgressBar: true,
          pauseOnHover: true,
          clickToClose: true
        });
      } else {
        console.error(res);
      }
    });
  }

  loadGrid() {
    this.gttApi.getAllCertificates().then((result: any) => {
      // Guarda los que no se hayan marcado como eliminados
      this.allCertificates = result.filter(val => !val.eliminado && (val.estado === 1 || val.estado === 2));
    }).catch(res => {
      // Si entra aqui es que no esta autorizado
      if (res.status === 401) {
        this.router.navigate(['/login']);
      } else {
        console.error(res);
      }
    });
  }

  deleteButton(cert: Certificate) {
    if (this.userActive.role === 0) {
      cert.eliminado = true;
      this.gttApi.updateCertificate(cert).then(result2 => {
        this.notification.success('¡Éxito!', `El certificado ${cert.alias} se ha marcado como eliminado exitosamente.`, {
          timeOut: 3000,
          showProgressBar: true,
          pauseOnHover: true,
          clickToClose: true
        });
        this.loadGrid();
      }).catch(res => {
        if (res.status === 401) {
          this.router.navigate(['/login']);
        } else {
          console.error(res);
        }
      });
    } else {
      this.notification.error('¡ERROR!', "No tienes la autorización necesaria para marcar como eliminados los certificados.", {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true
      });
    }
  }

}
