import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GttJiraService {

  urlJira: string = "/rest/auth/1/session";
  // Se debe añadir este header ya que si no da un error xsrf
  // El valor del agent puede ser cualquiera
  headerJira = { headers: {
    "User-Agent": "xx"
  }};   

  constructor(private api: HttpClient) { }

  verifiedUser(username: string, password: string) {
    return this.api.post(this.urlJira, {
      username,
      password
    }, this.headerJira).toPromise();
  }
}
