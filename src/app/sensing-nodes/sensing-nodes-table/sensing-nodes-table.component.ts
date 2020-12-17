import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { SensingNode } from '../sensing-node.model';
import { SensingNodesService } from '../sensing-nodes.service';

@Component({
  selector: 'app-sensing-nodes-table',
  templateUrl: './sensing-nodes-table.component.html',
  styleUrls: ['./sensing-nodes-table.component.scss']
})
export class SensingNodesTableComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['sensingNodeType', 'status', 'latitude', 'longitude', 'battery', 'availability', 'actions'];
  dataSource = new MatTableDataSource<SensingNode>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  loading = true;

  private sensingNodesSubscription: Subscription;

  constructor(private sensingNodesService: SensingNodesService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.sensingNodesSubscription = this.sensingNodesService.getSensingNodesEachNumSeconds(30)
    .subscribe(sensingNodes => {
      this.dataSource.data = sensingNodes;
      this.loading = false;
    });
  }

  ngOnDestroy(): void {
    if (this.sensingNodesSubscription) {
      this.sensingNodesSubscription.unsubscribe();
    }
  }
}
