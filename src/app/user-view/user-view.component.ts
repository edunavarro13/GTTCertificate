import { Component, OnInit } from '@angular/core';
import { GttApiService } from '../gtt-api.service';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss']
})
export class UserViewComponent implements OnInit {

  constructor(private gttApi: GttApiService) { }

  ngOnInit() {
    this.gttApi.permited();
  }

}
