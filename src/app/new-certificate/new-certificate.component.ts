import {
  Component,
  OnInit
} from '@angular/core';
import { GttApiService } from '../gtt-api.service';

@Component({
  selector: 'app-new-certificate',
  templateUrl: './new-certificate.component.html',
  styleUrls: ['./new-certificate.component.scss']
})
export class NewCertificateComponent implements OnInit {

  headers: object = JSON.parse(localStorage.getItem('headers')) || '';
  archivo: string = "vacio";

  afuConfig = {
    multiple: false,
    formatsAllowed: ".pfx,.p12",
    maxSize: "1",
    uploadAPI: {
      url: "api/certificate",
      headers: {
        "Content-Type": "application/x-pkcs12",
        "Authorization": `${this.headers}`
      }
    },
    theme: "dragNDrop",
    hideProgressBar: true,
    hideResetBtn: true,
    hideSelectBtn: true
  };

  constructor(private gttApi: GttApiService) {}

  aliasCert: string = "";
  orgaCert: string = "";
  clienteCert: string = "";
  repoCert: string = "";
  listCert: string = "";
  obserCert: string = "";
  emailCert: string = "";
  passCert: string = "";

  ngOnInit() {}

  imageUpload(ev: any) {
    console.log(ev);

  }

  obtainCert(event) {
    var reader = new FileReader();
    var arrayBuffer;
    let gtt_aux = this.gttApi;
    let resultadoObtenido = "vacio";
    reader.onload = function(){
      arrayBuffer = reader.result;
      let arrayBuffer2 = arrayBuffer.split(','); // Para quitar data:application/x-pkcs12;base64,
      // console.log(arrayBuffer);
      // console.log(arrayBuffer2);
      
      gtt_aux.addCertificate(arrayBuffer2[1]).then((response: any) => {
        resultadoObtenido = response.message;
        console.log(resultadoObtenido);
      }).catch(console.error);
    };
    reader.readAsDataURL(event.target.files[0]);
    this.archivo = resultadoObtenido;
  }

}
