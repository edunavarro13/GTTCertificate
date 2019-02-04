import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User, Jira } from './models.interface';

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

  register(username: string, password: string) {
    return this.api.post(this.urlRegis, {
      username,
      password
    }).toPromise();
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
    return this.api.get(this.urlRegis + `/${this.idUser}`).toPromise();
  }

  updateUser(newUser: User) {
    return this.api.put(this.urlRegis + `/${this.idUser}`, newUser).toPromise();
  }

  addJira(newJira: Jira) {
    newJira.idUser = this.idUser;
    localStorage.setItem('verified', JSON.stringify(0));
    return this.api.post(this.urlNewJira, newJira).toPromise();
  }

  getJiraByUserId() {
    return this.api.get(this.urlNewJira + `/${this.idUser}`).toPromise();
  }

  updateJira(newJira: Jira) {
    newJira.idUser = this.idUser;
    localStorage.setItem('verified', JSON.stringify(0));
    return this.api.put(this.urlNewJira + `/${this.idUser}`, newJira).toPromise();
  }

  getAllCertificates() {
    return this.api.get(this.urlCert).toPromise();
  }
}
