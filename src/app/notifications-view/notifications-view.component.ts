import { Component, OnInit } from '@angular/core';
import { GttApiService } from '../gtt-api.service';
import { NotificationsService } from 'angular2-notifications';
import { Certificate } from '../models.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notifications-view',
  templateUrl: './notifications-view.component.html',
  styleUrls: ['./notifications-view.component.scss']
})
export class NotificationsViewComponent implements OnInit {

  allCertificates: Array < Certificate > = [];
  constructor(private gttApi: GttApiService,
    private notification: NotificationsService, private router: Router) { }

  ngOnInit() {
    this.loadGrid();
  }

  loadGrid() {
    this.gttApi.getAllCertificates().then((result: any) => {
      // Guarda los que no se hayan marcado como eliminados
      this.allCertificates = result.filter(val => val.estado === 1 || val.estado === 2);
    }).catch(res => {
      // Si entra aqui es que no esta autorizado
      if (res.status === 401) {
        this.router.navigate(['/login']);
      } else {
        console.error(res);
      }
    });
  }

}
