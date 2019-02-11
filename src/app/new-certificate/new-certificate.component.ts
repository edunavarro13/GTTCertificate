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
import { GttApiService } from '../gtt-api.service';

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

  watchFile: boolean = false;

  constructor(private gttApi: GttApiService, private notification: NotificationsService) {}

  ngOnInit() {}

  imageUpload(ev: any) {
    console.log(ev);

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
      nombreArchivo: event.target.value.split("\\")[2]
    }
    var reader = new FileReader();
    var arrayBuffer;
    let gtt_aux = this.gttApi;
    let notification_aux = this.notification;
    reader.onloadend = function(){
      arrayBuffer = reader.result;
      let arrayBuffer2 = arrayBuffer.split(','); // Para quitar data:application/x-pkcs12;base64,
      gtt_aux.addCertificate(arrayBuffer2[1], certificateGo).then((response: any) => {
        notification_aux.success('¡Éxito!', `El certificado ${certificateGo.alias} ha sido registrado satisfactoriamente.`, {
          timeOut: 3000,
          showProgressBar: true,
          pauseOnHover: true,
          clickToClose: true
        });
      }).catch( (res: any) => {
        notification_aux.error('¡Error!', 'La contraseña no es correcta.', {
          timeOut: 3000,
          showProgressBar: true,
          pauseOnHover: true,
          clickToClose: true
        });
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
    if(this.aliasCert && this.clienteCert && this.emailCert && this.listCert && this.obserCert 
      && this.orgaCert && this.repoCert && this.passCert) {
      this.watchFile = true;
    } else {
      this.watchFile = false;
    }
  }

  infoButton(option: number) {
    if(option === 1) {
      this.notification.info('Información', `En Alias debes definir el sobrenombre que quieres darle al certificado.`, {
        timeOut: 5000,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true
      });
    }
    else if(option === 2) {
      this.notification.info('Información', `En ID_ORGA debes poner el identificador del organismo que lo utiliza.`, {
        timeOut: 5000,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true
      });
    }
    else if(option === 3) {
      this.notification.info('Información', `En Lista de integraciones debes definir las integraciones con la institución donde se utiliza el certificado.`, {
        timeOut: 5000,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true
      });
    }
    else if(option === 4) {
      this.notification.info('Información', `En Persona para renovaciones debes poner el email de la persona de contacto para renovaciones del certificado.`, {
        timeOut: 5000,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true
      });
    }
    else if(option === 5) {
      this.notification.info('Información', `En Repositorio debes introducir un texto descriptivo de donde está ubicado el certificado para su uso.`, {
        timeOut: 5000,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true
      });
    }
    else if(option === 6) {
      this.notification.info('Información', `En Cliente debes definir el nombre del cliente que utiliza el certificado`, {
        timeOut: 5000,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true
      });
    }
    else if(option === 7) {
      this.notification.info('Información', `En Observaciones puedes hacer anotaciones al certificado.`, {
        timeOut: 5000,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true
      });
    }
    else if(option === 8) {
      this.notification.info('Información', `En Contraseña debes introducir la contraseña del certificado que quieres subir.`, {
        timeOut: 5000,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true
      });
    }
    else if(option === 9) {
      this.notification.info('Información', `Para poder agregar un certificado primero debes rellenar todos los campos y, luego, pulsar en el botón Examinar que aparecerá y elegir el certificado deseado.`, {
        timeOut: 5000,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true
      });
    }
  }

}
