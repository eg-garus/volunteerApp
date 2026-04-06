import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Questionnaire } from '../../../model/questionnaire.model';

@Component({
  selector: 'app-view-questionnaire',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './view-questionnaire.component.html',
  styleUrl: './view-questionnaire.component.scss'
})
export class ViewQuestionnaireComponent {
  constructor(
    public dialogRef: MatDialogRef<ViewQuestionnaireComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { questionnaire: Questionnaire }
  ) {}

  close() {
    this.dialogRef.close();
  }
}