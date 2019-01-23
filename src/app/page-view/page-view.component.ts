import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-view',
  templateUrl: './page-view.component.html',
  styleUrls: ['./page-view.component.scss']
})
export class PageViewComponent implements OnInit {

  constructor(private routerLog: Router) { }

  ngOnInit() {
  }

  logOut() {
    if (confirm(`Are you sure you want to Log out?`)) {
      localStorage.clear();
      this.routerLog.navigate(['/login']);
    }
  }
}
