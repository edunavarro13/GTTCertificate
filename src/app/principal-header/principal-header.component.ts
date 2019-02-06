import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { GttApiService } from '../gtt-api.service';
import { User } from '../models.interface';

@Component({
  selector: 'app-principal-header',
  templateUrl: './principal-header.component.html',
  styleUrls: ['./principal-header.component.scss']
})
export class PrincipalHeaderComponent implements OnInit {

  userHeader: User;

  constructor(private routerLog: Router, private gttApi: GttApiService) { }

  ngOnInit() {
    this.gttApi.permited();
    this.gttApi.getUserById().then((responseUser: User) => {
      this.userHeader = responseUser;
    }).catch(console.error);
  }

  logOut() {
    if (confirm(`¿Estás seguro que quieres cerrar la sesión?`)) {
      localStorage.clear();
      this.routerLog.navigate(['/login']);
    }
  }

}
