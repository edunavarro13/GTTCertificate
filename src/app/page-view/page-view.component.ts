import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GttApiService } from '../gtt-api.service';
import { Certificate } from '../models.interface';

@Component({
  selector: 'app-page-view',
  templateUrl: './page-view.component.html',
  styleUrls: ['./page-view.component.scss']
})
export class PageViewComponent implements OnInit {

  allCertificates: Array<Certificate> = [];

  constructor(private routerLog: Router, private gttApi: GttApiService) { }

  ngOnInit() {
    this.gttApi.permited();
    this.gttApi.getAllCertificates().then( (result: any) => {
      this.allCertificates = result;
      console.log(result);
    }).catch(console.error);
  }

  logOut() {
    if (confirm(`¿Estás seguro que quieres cerrar la sesión?`)) {
      localStorage.clear();
      this.routerLog.navigate(['/login']);
    }
  }
}
