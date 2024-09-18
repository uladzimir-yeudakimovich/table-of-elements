import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PeriodicElement } from '../../../home/models/periodic-element.model';

@Component({
  selector: 'app-modal-window',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    ReactiveFormsModule,
  ],
  templateUrl: './modal-window.component.html',
  styleUrl: './modal-window.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalWindowComponent {
  data = inject<PeriodicElement>(MAT_DIALOG_DATA);

  readonly dialogRef = inject(MatDialogRef<ModalWindowComponent>);

  elementForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.elementForm = this.fb.group({
      name: [this.data.name],
      weight: [this.data.weight],
      symbol: [this.data.symbol],
    });
  }

  update(): void {
    this.dialogRef.close({ ...this.elementForm.value, position: this.data.position });
  }
}
