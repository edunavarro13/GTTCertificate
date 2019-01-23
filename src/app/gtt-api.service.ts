import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GttApiService {

  jwt: string;
  headers: object = JSON.parse(localStorage.getItem('headers')) || '';

  constructor(private api: HttpClient) {}

  register(username: string, password: string) {
    return this.api.post("https://apitrello.herokuapp.com/users", {
      username,
      password
    }).toPromise();
  }

  login(username: string, password: string) {
    return new Promise((resolve, reject) =>
      this.api.post("https://apitrello.herokuapp.com/users/login", {
        username,
        password
      }).toPromise()
      .then(response => {
        reject('User not found');
      }).catch(badResponse => {
        if (badResponse.status === 200) {
          this.jwt = badResponse.error.text;
          this.headers = {
            headers: {
              Authorization: `Bearer ${this.jwt}`
            }
          }
          localStorage.setItem('headers', JSON.stringify(this.headers));
          resolve(badResponse.error.text);
        } else if (badResponse.status === 401) {
          reject(`Wrong password`);
        } else {
          reject(`Try again`);
        }
      }));
  }
}
