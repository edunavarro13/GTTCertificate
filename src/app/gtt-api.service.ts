import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GttApiService {

  jwt: string;
  idUser: number = JSON.parse(localStorage.getItem('idUser')) || -1;
  headers: object = JSON.parse(localStorage.getItem('headers')) || '';
  urlAuth: string = "api/auth";
  urlRegis: string = "api/user";

  constructor(private api: HttpClient, private router: Router) {}

  permited() {
    if(this.idUser === -1) {
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

  // login(username: string, password: string) {
  //   return new Promise((resolve, reject) =>
  //     this.api.post("https://apitrello.herokuapp.com/users/login", {
  //       username,
  //       password
  //     }).toPromise()
  //     .then(response => {
  //       reject('User not found');
  //     }).catch(badResponse => {
  //       if (badResponse.status === 200) {
  //         this.jwt = badResponse.error.text;
  //         this.headers = {
  //           headers: {
  //             Authorization: `Bearer ${this.jwt}`
  //           }
  //         }
  //         localStorage.setItem('headers', JSON.stringify(this.headers));
  //         resolve(badResponse.error.text);
  //       } else if (badResponse.status === 401) {
  //         reject(`Wrong password`);
  //       } else {
  //         reject(`Try again`);
  //       }
  //     }));
  // }
}
