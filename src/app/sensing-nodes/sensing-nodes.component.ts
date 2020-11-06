import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sensing-nodes',
  templateUrl: './sensing-nodes.component.html',
  styleUrls: ['./sensing-nodes.component.scss']
})
export class SensingNodesComponent implements OnInit {

  tabs = [
    {
      title: 'Map',
      route: './map',
      icon: 'map'
    },
    {
      title: 'Table',
      route: './table',
      icon: 'list',
    },
  ];

  constructor() {
  }

  ngOnInit(): void {
  }
}
