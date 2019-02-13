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

  constructor(private gttApi: GttApiService,
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

  deleteButton(idCert: number) {
    if (this.userActive.role === 0) {
      this.gttApi.getCertificateById(idCert).then((result: Certificate) => {
        result.eliminado = !result.eliminado;
        this.gttApi.updateCertificate(result).then(result2 => {
          if (!this.viewDelete) {
            this.notification.success('¡Éxito!', `El certificado ${result.alias} se ha marcado como eliminado exitosamente.`, {
              timeOut: 3000,
              showProgressBar: true,
              pauseOnHover: true,
              clickToClose: true
            });
          } else {
            this.notification.success('¡Éxito!', `El certificado ${result.alias} se ha marcado como activo exitosamente.`, {
              timeOut: 3000,
              showProgressBar: true,
              pauseOnHover: true,
              clickToClose: true
            });
          }
          this.loadGrid();
        }).catch(res => {
          if (res.status === 401) {
            this.router.navigate(['/login']);
          } else {
            console.error(res);
          }
        });
      }).catch(res2 => {
        if (res2.status === 401) {
          this.router.navigate(['/login']);
        } else {
          console.error(res2);
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
        this.router.navigate(['/certificate']);
      } else {
        this.notification.error('¡ERROR!', "No tienes la autorización necesaria para agregar nuevos certificados.", {
          timeOut: 3000,
          showProgressBar: true,
          pauseOnHover: true,
          clickToClose: true
        });
      }
    }
    else {
      this.notification.error('¡ERROR!', 'No se ha podido conectar al servidor. Vuelve a intentarlo más tarde.', {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true
      });
    }
  }

  downloadFile(certificate: Certificate) {
    let certificateType = certificate.nombreArchivo.split('.')[1];
    var contentType = "file/" + certificateType;
    var byteCharacters = atob(certificate.fichero64);
    var byteNumbers = new Array(byteCharacters.length);

    for (var i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    var byteArray = new Uint8Array(byteNumbers);
    var blob = new Blob([byteArray], {
      type: contentType
    });
    var aux_document = document.createElement("a");
    aux_document.href = URL.createObjectURL(blob);
    aux_document.download = `${certificate.nombreArchivo}`;
    document.body.appendChild(aux_document);
    aux_document.click();
  }
}
