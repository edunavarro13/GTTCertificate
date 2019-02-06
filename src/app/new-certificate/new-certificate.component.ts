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

  ngOnInit() {}

  imageUpload(ev: any) {
    console.log(ev);

  }

  readThis(inputValue: any): void {
    // var file:File = inputValue.files[0];
    // var myReader:FileReader = new FileReader();
  
    // myReader.onloadend = (e) => {
    //   this.avatar = myReader.result;
    // }
    // myReader.readAsArrayBuffer(file);
    // console.log(myReader);
    
  }

  obtainCert(event) {
    var reader = new FileReader();
    var arrayBuffer;
    let gtt_aux = this.gttApi;
    let resultadoObtenido = "vacio";
    reader.onload = function(){
      arrayBuffer = reader.result;
      let arrayBuffer2 = arrayBuffer.substring(33); // Para quitar data:application/x-pkcs12;base64,
      // console.log(arrayBuffer);
      // console.log(arrayBuffer2);
      
      gtt_aux.addCertificate(arrayBuffer2).then((response: any) => {
        resultadoObtenido = response.message;
        console.log(resultadoObtenido);
      }).catch(console.error);
    };
    reader.readAsDataURL(event.target.files[0]);
    this.archivo = resultadoObtenido;
  }

}
