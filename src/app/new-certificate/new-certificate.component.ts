import {
  Component,
  OnInit
} from '@angular/core';
import {
  Certificate
} from '../models.interface';
import {
  NotificationsService
} from 'angular2-notifications';
import {
  GttApiService
} from '../gtt-api.service';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import { AuxiliarsService } from '../auxiliars.service';

@Component({
  selector: 'app-new-certificate',
  templateUrl: './new-certificate.component.html',
  styleUrls: ['./new-certificate.component.scss']
})
export class NewCertificateComponent implements OnInit {

  headers: object = JSON.parse(localStorage.getItem('headers')) || '';

  aliasCert: string = "";
  orgaCert: string = "";
  clienteCert: string = "";
  repoCert: string = "";
  listCert: string = "";
  obserCert: string = "";
  emailCert: string = "";
  passCert: string = "";

  id: number;
  certificateActive: Certificate;
  watchFile: boolean = false;

  constructor(private route: ActivatedRoute, private gttApi: GttApiService, private auxiliarService: AuxiliarsService,
    private notification: NotificationsService, private router: Router) {}

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');
    if (this.id > 0) {
      this.getCertificate();
    }
  }

  // imageUpload(ev: any) {
  //   console.log(ev);

  // }

  getCertificate() {
    this.gttApi.getCertificateById(this.id).then((response: any) => {
      this.certificateActive = response;
      this.aliasCert = this.certificateActive.alias;
      this.orgaCert = "" + this.certificateActive.id_orga;
      this.clienteCert = this.certificateActive.cliente;
      this.repoCert = this.certificateActive.repositorio;
      this.listCert = this.certificateActive.itegraciones_institucion;
      this.obserCert = this.certificateActive.observaciones;
      this.emailCert = this.certificateActive.persona_contacto;
    }).catch(res => {
      if (res.status === 401) {
        this.router.navigate(['/login']);
      }
      if (res.status === 504) {
        console.error(res);
        this.notification.error('¡ERROR!', 'No se ha podido conectar al servidor. Vuelve a intentarlo más tarde.', this.auxiliarService.getNotificationError());
      } else {
        console.error(res);
      }
    });
  }

  obtainCert(event) {
    let certificateGo: Certificate = {
      id: undefined,
      alias: this.aliasCert,
      id_orga: +this.orgaCert,
      cliente: this.clienteCert,
      repositorio: this.repoCert,
      itegraciones_institucion: this.listCert,
      observaciones: this.obserCert,
      persona_contacto: this.emailCert,
      password: this.passCert,
      subject: "",
      caducidad: new Date(),
      entidad_emisora: "",
      serie: "",
      eliminado: false,
      fichero64: "",
      nombreArchivo: event.target.value.split("\\")[2],
      estado: 0
    }
    var reader = new FileReader();
    var arrayBuffer;
    // Se necesitan los auxiliares ya que dentro de reader.onloadend no se puede acceder a this
    let gtt_aux = this.gttApi;
    let notification_aux = this.notification;
    let auxiliarService_aux = this.auxiliarService;
    reader.onloadend = function () {
      arrayBuffer = reader.result;
      let arrayBuffer2 = arrayBuffer.split(','); // Para quitar data:application/x-pkcs12;base64,
      gtt_aux.addCertificate(arrayBuffer2[1], certificateGo).then((response: any) => {
        notification_aux.success('¡Éxito!', `El certificado ${certificateGo.alias} ha sido registrado satisfactoriamente.`, auxiliarService_aux.getNotificationError());
      }).catch((res: any) => {
        if (res.status === 504) {
          console.error(res);
          notification_aux.error('¡ERROR!', 'No se ha podido conectar al servidor. Vuelve a intentarlo más tarde.', auxiliarService_aux.getNotificationError());
        } else {
          notification_aux.error('¡Error!', 'La contraseña no es correcta.', auxiliarService_aux.getNotificationError());
        }
      });
    };
    reader.readAsDataURL(event.target.files[0]);
    this.aliasCert = "";
    this.orgaCert = "";
    this.clienteCert = "";
    this.repoCert = "";
    this.listCert = "";
    this.obserCert = "";
    this.emailCert = "";
    this.passCert = "";
    this.watchFile = false;
  }

  areEmpty() {
    if (this.aliasCert && this.clienteCert && this.emailCert && this.listCert // && this.obserCert Esto es opcional
      &&
      this.orgaCert && this.repoCert && this.passCert) {
      this.watchFile = true;
    } else {
      this.watchFile = false;
    }
  }

  updatePublicCert() {
    if (this.aliasCert && this.clienteCert && this.emailCert && this.listCert // && this.obserCert Esto es opcional
      &&
      this.orgaCert && this.repoCert) {

      this.certificateActive.alias = this.aliasCert;
      this.certificateActive.id_orga = +this.orgaCert;
      this.certificateActive.cliente = this.clienteCert;
      this.certificateActive.repositorio = this.repoCert;
      this.certificateActive.itegraciones_institucion = this.listCert;
      this.certificateActive.observaciones = this.obserCert;
      this.certificateActive.persona_contacto = this.emailCert;

      this.gttApi.updateCertificate(this.certificateActive).then(res => {
        this.router.navigate(['/certificate/' + this.id]);
      }).catch(console.error);
    } else {
      this.notification.error('¡ERROR!', "Ninguno de los campos pueden estar vacíos.", this.auxiliarService.getNotificationError());
    }
  }

  infoButton(option: number) {
    this.auxiliarService.infoButton(option, this.notification);
  }

}
