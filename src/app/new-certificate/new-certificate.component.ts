import {
  Component,
  OnInit
} from '@angular/core';
import {
  Certificate
} from '../models.interface';
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

  constructor(private gttApi: GttApiService) {}

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
    reader.onload = function(){
      arrayBuffer = reader.result;
      let arrayBuffer2 = arrayBuffer.split(','); // Para quitar data:application/x-pkcs12;base64,
      gtt_aux.addCertificate(arrayBuffer2[1], certificateGo).then((response: any) => {
        console.log(response);
      }).catch(console.error);
    };
    reader.readAsDataURL(event.target.files[0]);
  }

  areEmpty() {
    if(this.aliasCert && this.clienteCert && this.emailCert && this.listCert && this.obserCert 
      && this.orgaCert && this.repoCert && this.passCert) {
      this.watchFile = true;
    } else {
      this.watchFile = false;
    }
  }

}
