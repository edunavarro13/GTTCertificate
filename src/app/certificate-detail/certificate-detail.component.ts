import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GttApiService } from '../gtt-api.service';
import { Certificate } from '../models.interface';

@Component({
  selector: 'app-certificate-detail',
  templateUrl: './certificate-detail.component.html',
  styleUrls: ['./certificate-detail.component.scss']
})
export class CertificateDetailComponent implements OnInit {

  id: number;
  certificateActive: Certificate;
  constructor(private route: ActivatedRoute, private apiService: GttApiService) { }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.getCertificate();
  }

  getCertificate() {
    this.apiService.getCertificateById(this.id).then( (response: any) => {
      this.certificateActive = response;
    }).catch(console.error);
  }

}
