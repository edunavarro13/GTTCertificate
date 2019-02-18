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
import {
  Router
} from '@angular/router';
import { AuxiliarsService } from '../auxiliars.service';

@Component({
  selector: 'app-page-view',
  templateUrl: './page-view.component.html',
  styleUrls: ['./page-view.component.scss']
})
export class PageViewComponent implements OnInit {

  allCertificates: Array < Certificate > = [];
  allCertificatesDelete: Array < Certificate > = [];
  userActive: User;
  certificateActive: Certificate;
  boolCert: boolean = false;
  columnActive: number = 0;
  viewDelete = false;
  // Input de la campana del header
  contadorPadre: number = 0;

  constructor(private gttApi: GttApiService, private auxiliarService: AuxiliarsService,
    private notification: NotificationsService, private router: Router) {}

  ngOnInit() {
    this.loadGrid();
    this.gttApi.getUserById().then((responseUser: User) => {
      this.userActive = responseUser;
    }).catch(res => {
      if (res.status === 401) {
        this.router.navigate(['/login']);
      } else if (res.status === 504) {
        console.error(res);
        this.notification.error('¡ERROR!', 'No se ha podido conectar al servidor. Vuelve a intentarlo más tarde.', this.auxiliarService.getNotificationError());
      } else {
        console.error(res);
      }
    });
  }

  loadGrid() {
    this.gttApi.getAllCertificates().then((result: any) => {
      // Guarda los que no se hayan marcado como eliminados
      this.allCertificates = result.filter(val => !val.eliminado);
      this.allCertificatesDelete = result.filter(valDel => valDel.eliminado);
      this.modeOrdenate(0);
    }).catch(res => {
      // Si entra aqui es que no esta autorizado
      if (res.status === 401) {
        this.router.navigate(['/login']);
      } else {
        console.error(res);
      }
    });
  }

  detailButton(idCert: number) {
    this.router.navigate(['/certificate/' + idCert]);
  }

  deleteButton(cert: Certificate) {
    if (this.userActive.role === 0) {
      cert.eliminado = !cert.eliminado;
      this.gttApi.updateCertificate(cert).then(result2 => {
        if (!this.viewDelete) {
          this.notification.success('¡Éxito!', `El certificado ${cert.alias} se ha marcado como eliminado exitosamente.`, this.auxiliarService.getNotificationError());
          // Cambio este valor para que se llame a ngOnChange
          this.contadorPadre += 1;
        } else {
          this.notification.success('¡Éxito!', `El certificado ${cert.alias} se ha marcado como activo exitosamente.`, this.auxiliarService.getNotificationError());
          this.contadorPadre += 1;
        }
        this.loadGrid();
      }).catch(res => {
        if (res.status === 401) {
          this.router.navigate(['/login']);
        } else {
          console.error(res);
        }
      });
    } else {
      this.notification.error('¡ERROR!', "No tienes la autorización necesaria para marcar como eliminados los certificados.", this.auxiliarService.getNotificationError());
    }
  }

  // Metodo para ordenar por columnas
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
        return 0;
      } else if (type === 1) {
        if ((asc && a.caducidad > b.caducidad) || (!asc && a.caducidad < b.caducidad)) {
          return 1;
        }
        if ((!asc && a.caducidad > b.caducidad) || (asc && a.caducidad < b.caducidad)) {
          return -1;
        }
        return 0;
      } else if (type === 2) {
        if ((asc && a.subject.split("CN=")[1].split(",")[0] > b.subject.split("CN=")[1].split(",")[0]) ||
          (!asc && a.subject.split("CN=")[1].split(",")[0] < b.subject.split("CN=")[1].split(",")[0])) {
          return 1;
        }
        if ((!asc && a.subject.split("CN=")[1].split(",")[0] > b.subject.split("CN=")[1].split(",")[0]) ||
          (asc && a.subject.split("CN=")[1].split(",")[0] < b.subject.split("CN=")[1].split(",")[0])) {
          return -1;
        }
        return 0;
      } else {
        if ((asc && a.id_orga > b.id_orga) || (!asc && a.id_orga < b.id_orga)) {
          return 1;
        }
        if ((!asc && a.id_orga > b.id_orga) || (asc && a.id_orga < b.id_orga)) {
          return -1;
        }
        return 0;
      }
    });
    this.allCertificatesDelete.sort(function (a, b) {
      if (type === 0) {
        if ((asc && a.alias > b.alias) || (!asc && a.alias < b.alias)) {
          return 1;
        }
        if ((!asc && a.alias > b.alias) || (asc && a.alias < b.alias)) {
          return -1;
        }
        return 0;
      } else if (type === 1) {
        if ((asc && a.caducidad > b.caducidad) || (!asc && a.caducidad < b.caducidad)) {
          return 1;
        }
        if ((!asc && a.caducidad > b.caducidad) || (asc && a.caducidad < b.caducidad)) {
          return -1;
        }
        return 0;
      } else if (type === 2) {
        if ((asc && a.subject.split("CN=")[1].split(",")[0] > b.subject.split("CN=")[1].split(",")[0]) ||
          (!asc && a.subject.split("CN=")[1].split(",")[0] < b.subject.split("CN=")[1].split(",")[0])) {
          return 1;
        }
        if ((!asc && a.subject.split("CN=")[1].split(",")[0] > b.subject.split("CN=")[1].split(",")[0]) ||
          (asc && a.subject.split("CN=")[1].split(",")[0] < b.subject.split("CN=")[1].split(",")[0])) {
          return -1;
        }
        return 0;
      } else {
        if ((asc && a.cliente > b.cliente) || (!asc && a.cliente < b.cliente)) {
          return 1;
        }
        if ((!asc && a.cliente > b.cliente) || (asc && a.cliente < b.cliente)) {
          return -1;
        }
        return 0;
      }
    });
  }

  toAddCertificate() {
    if (this.userActive) {
      if (this.userActive.role === 0) {
        this.router.navigate(['/certificateview/0']);
      } else {
        this.notification.error('¡ERROR!', "No tienes la autorización necesaria para agregar nuevos certificados.", this.auxiliarService.getNotificationError());
      }
    } else {
      this.notification.error('¡ERROR!', 'No se ha podido conectar al servidor. Vuelve a intentarlo más tarde.', this.auxiliarService.getNotificationError());
    }
  }
}
