import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GttApiService } from '../gtt-api.service';
import { Certificate } from '../models.interface';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-certificate-detail',
  templateUrl: './certificate-detail.component.html',
  styleUrls: ['./certificate-detail.component.scss']
})
export class CertificateDetailComponent implements OnInit {

  id: number;
  certificateActive: Certificate;
  constructor(private route: ActivatedRoute, private apiService: GttApiService, private routeAtr: Router,
    private notification: NotificationsService) { }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.getCertificate();
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

}
