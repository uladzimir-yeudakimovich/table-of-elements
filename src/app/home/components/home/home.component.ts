import { Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgIf } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { PeriodicElement } from '../../models/periodic-element.model';
import { PeriodicElementService } from '../../services/periodic-element.service';
import { HttpClientModule } from '@angular/common/http';
import { ModalWindowComponent } from '../../../shared/components/modal-window/modal-window.component';
import { MatDialog } from '@angular/material/dialog';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { FilterElementsPipe } from '../../../shared/pipes/filter-elements.pipe';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HttpClientModule,
    FilterElementsPipe,
    FormsModule,
    NgIf,
    MatTableModule,
    MatProgressSpinner,
    MatInputModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [PeriodicElementService],
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource: PeriodicElement[] | null = null;
  filterKeyword = '';

  constructor(
    private periodicElementService: PeriodicElementService,
    private destroyRef: DestroyRef,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.periodicElementService.getElements().pipe(
      takeUntilDestroyed(this.destroyRef),
    ).subscribe(res => this.dataSource = res);
  }

  openDialog(row: PeriodicElement): void {
    const index = row.position;
    const dialogRef = this.dialog.open(ModalWindowComponent, {
      data: row,
    });
    dialogRef.afterClosed().pipe(
      takeUntilDestroyed(this.destroyRef),
    ).subscribe((result: PeriodicElement) => {
      if (result) {
        this.dataSource = this.dataSource!.map((item) =>
          item.position === index ? result : item
        );
      }
    });
  }
}
