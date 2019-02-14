import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GttApiService } from '../gtt-api.service';
import { Certificate, User } from '../models.interface';
import { NotificationsService } from 'angular2-notifications';
import { AuxiliarsService } from '../auxiliars.service';

@Component({
  selector: 'app-certificate-detail',
  templateUrl: './certificate-detail.component.html',
  styleUrls: ['./certificate-detail.component.scss']
})
export class CertificateDetailComponent implements OnInit {

  id: number;
  certificateActive: Certificate;
  userActive: User;

  constructor(private route: ActivatedRoute, private apiService: GttApiService, private routeAtr: Router,
    private notification: NotificationsService, private auxService: AuxiliarsService) { }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.getCertificate();
    this.apiService.getUserById().then((responseUser: User) => {
      this.userActive = responseUser;
    }).catch(res => {
      if (res.status === 401) {
        this.routeAtr.navigate(['/login']);
      } else if (res.status === 504) {
        console.error(res);
        this.notification.error('¡ERROR!', 'No se ha podido conectar al servidor. Vuelve a intentarlo más tarde.', {
          timeOut: 3000,
          showProgressBar: true,
          pauseOnHover: true,
          clickToClose: true
        });
      } else {
        console.error(res);
      }
    });
  }

  getCertificate() {
    this.apiService.getCertificateById(this.id).then( (response: any) => {
      this.certificateActive = response;
    }).catch(res => {
      if(res.status === 401) {
        this.routeAtr.navigate(['/login']);
      } if (res.status === 504) {
        console.error(res);
        this.notification.error('¡ERROR!', 'No se ha podido conectar al servidor. Vuelve a intentarlo más tarde.', {
          timeOut: 3000,
          showProgressBar: true,
          pauseOnHover: true,
          clickToClose: true
        });
      } else {
        console.error(res);
      }
    });
  }

  toUpdateCertificate() {
    if (this.userActive) {
      if (this.userActive.role === 0) {
        let chain = '/certificateview/'+ this.id;
        this.routeAtr.navigate([chain]);
      } else {
        this.notification.error('¡ERROR!', "No tienes la autorización necesaria para agregar nuevos certificados.", {
          timeOut: 3000,
          showProgressBar: true,
          pauseOnHover: true,
          clickToClose: true
        });
      }
    } else {
      this.notification.error('¡ERROR!', 'No se ha podido conectar al servidor. Vuelve a intentarlo más tarde.', {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true
      });
    }
  }

}
