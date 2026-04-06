import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Questionnaire } from './../../model/questionnaire.model';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-view-questionnaire',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewQuestionnaireComponent implements OnInit {
  questionnaire: Questionnaire | null = null;
  loading = true;
  userId!: number;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    this.userId = +this.route.snapshot.paramMap.get('userId')!;
    this.loadQuestionnaire();
  }

  loadQuestionnaire() {
    this.http.get<Questionnaire>(`${environment.apiUrl}/questionnaires/user/${this.userId}`).subscribe({
      next: (data) => {
        this.questionnaire = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        alert('Анкета не найдена');
      }
    });
  }

  goBack() {
    window.history.back();
  }
}