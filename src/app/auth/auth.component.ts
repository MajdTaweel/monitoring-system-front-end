import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit(): void {
  }

  back(): boolean {
    this.location.back();
    return false;
  }
}
