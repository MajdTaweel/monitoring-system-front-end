import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PollutionReadings } from '../readings.model';
import { ReadingsService } from '../readings.service';

@Component({
  selector: 'app-pollution-readings',
  templateUrl: './pollution-readings.component.html',
  styleUrls: ['./pollution-readings.component.scss']
})
export class PollutionReadingsComponent implements OnInit {

  displayedColumns: string[] = ['air', 'sound'];
  dataSource = new MatTableDataSource<PollutionReadings>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  private readingsSubscription: Subscription;

  constructor(private route: ActivatedRoute, private readingsService: ReadingsService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    const sensingNodeId = +this.route.snapshot.paramMap.get('sensingNodeId');
    this.readingsSubscription = this.readingsService.getPollutionReadings(sensingNodeId)
      .subscribe(readings => this.dataSource.data = readings);
  }

  ngOnDestroy(): void {
    if (this.readingsSubscription) {
      this.readingsSubscription.unsubscribe();
    }
  }
}
