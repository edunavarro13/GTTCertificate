import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { GttApiService } from '../gtt-api.service';
import { User, Jira } from '../models.interface';

@Component({
  selector: 'app-principal-header',
  templateUrl: './principal-header.component.html',
  styleUrls: ['./principal-header.component.scss']
})
export class PrincipalHeaderComponent implements OnInit {

  userHeader: User;
  jiraHeader: Jira;
  @Input() contador: number;

  constructor(private routerLog: Router, private gttApi: GttApiService) { }

  ngOnInit() {
    this.gttApi.permited();
    this.gttApi.getUserById().then((responseUser: User) => {
      this.userHeader = responseUser;
    }).catch( res => {
      if(res.status === 401) {
        this.routerLog.navigate(['/login']);
      } else {
        console.error(res);
      }
    });

    // ------ Boton de notification bell ---------
    var el = document.querySelector('.notification');
    this.gttApi.getCountCaducadosAlertados().then((response: any) => {
      this.contador = +(response.message);
      el.setAttribute('data-count', "" + this.contador);
    el.classList.remove('notify');
    // el.offsetWidth = el.offsetWidth;
    el.classList.add('notify');
    el.classList.add('show-count');
    });
    //--------------------------------------------
  }

  // Cada vez que cambia el valor del INPUT se llama a este metodo
  ngOnChanges() {
    var el = document.querySelector('.notification');
    this.gttApi.getCountCaducadosAlertados().then((response: any) => {
      this.contador = +(response.message);
      el.setAttribute('data-count', "" + this.contador);
    el.classList.remove('notify');
    // el.offsetWidth = el.offsetWidth;
    el.classList.add('notify');
    el.classList.add('show-count');
    });
  }

  logOut() {
    if (confirm(`¿Estás seguro que quieres cerrar la sesión?`)) {
      localStorage.clear();
      this.routerLog.navigate(['/login']);
    }
  }

}
