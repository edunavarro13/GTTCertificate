import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Certificate } from './models.interface';

@Injectable({
  providedIn: 'root'
})
export class AuxiliarsService {

  constructor(private api: HttpClient, private router: Router) { }

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
