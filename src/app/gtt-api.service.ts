import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User, Jira, Certificate } from './models.interface';

@Injectable({
  providedIn: 'root'
})
export class GttApiService {

  jwt: string;
  idUser: number = JSON.parse(localStorage.getItem('idUser')) || -1;
  headers: object = JSON.parse(localStorage.getItem('headers')) || '';
  urlAuth: string = "api/auth";
  urlRegis: string = "api/user";
  urlNewJira: string = "api/jira";
  urlCert: string = "api/certificate";

  constructor(private api: HttpClient, private router: Router) {}

  permited() {
    if(!this.headers) {
      this.router.navigate(['/login']);
    }
  }

  register(username: string, password: string, role: number) {
    return this.api.post(this.urlRegis, {
      username,
      password,
      role
    }, this.headers).toPromise();
  }

  login(username: string, password: string) {
    return new Promise((resolve, reject) =>
      this.api.post(this.urlAuth, {
        username,
        password
      }).toPromise()
      .then((response: any) => {
        if(response.status === 200) {
          this.jwt = response.jwt;
          this.headers = {
            headers: {
              Authorization: `Bearer ${this.jwt}`
            }
          }
          this.idUser = response.idUser;
          localStorage.setItem('headers', JSON.stringify(this.headers));
          localStorage.setItem('idUser', JSON.stringify(this.idUser));
          resolve(response.jwt);
        }
        else {
          reject(response.message);
        }
        
      }).catch(badResponse => {
        console.log(badResponse);
      }));
  }

  getUserById() {
    return this.api.get(this.urlRegis + `/${this.idUser}`, this.headers).toPromise();
  }

  updateUser(newUser: User) {
    return this.api.put(this.urlRegis + `/${this.idUser}`, newUser, this.headers).toPromise();
  }

  addJira(newJira: Jira) {
    newJira.idUser = this.idUser;
    localStorage.setItem('verified', JSON.stringify(0));
    return this.api.post(this.urlNewJira, newJira, this.headers).toPromise();
  }

  getJiraByUserId() {
    return this.api.get(this.urlNewJira + `/${this.idUser}`, this.headers).toPromise();
  }

  updateJira(newJira: Jira) {
    newJira.idUser = this.idUser;
    localStorage.setItem('verified', JSON.stringify(0));
    return this.api.put(this.urlNewJira + `/${this.idUser}`, newJira, this.headers).toPromise();
  }

  getAllCertificates() {
    return this.api.get(this.urlCert, this.headers).toPromise();
  }

  getCertificateById(idCert: number) {
    return this.api.get(this.urlCert + `/${idCert}`, this.headers).toPromise();
  }

  updateCertificate(newCert: Certificate) {
    return this.api.put(this.urlCert + `/${newCert.id}`, newCert, this.headers).toPromise();
  } 

  addCertificate(fichero64: any, certificate: Certificate) {
    certificate.fichero64 = fichero64;
    return this.api.post(this.urlCert, certificate, this.headers).toPromise();
  }
}
