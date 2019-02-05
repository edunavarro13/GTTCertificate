import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-principal-header',
  templateUrl: './principal-header.component.html',
  styleUrls: ['./principal-header.component.scss']
})
export class PrincipalHeaderComponent implements OnInit {

  constructor(private routerLog: Router) { }

  ngOnInit() {
  }

  logOut() {
    if (confirm(`¿Estás seguro que quieres cerrar la sesión?`)) {
      localStorage.clear();
      this.routerLog.navigate(['/login']);
    }
  }

}
