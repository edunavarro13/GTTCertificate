import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GttApiService } from '../gtt-api.service';

@Component({
  selector: 'app-page-view',
  templateUrl: './page-view.component.html',
  styleUrls: ['./page-view.component.scss']
})
export class PageViewComponent implements OnInit {

  constructor(private routerLog: Router, private gttApi: GttApiService) { }

  ngOnInit() {
    this.gttApi.permited();
  }

  logOut() {
    if (confirm(`Are you sure you want to Log out?`)) {
      localStorage.clear();
      this.routerLog.navigate(['/login']);
    }
  }
}
