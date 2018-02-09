import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public QX: number;

  constructor(public router: Router) { }

  ngOnInit() {
    this.QX = sessionStorage['Qx'];
  }

  exit() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}
