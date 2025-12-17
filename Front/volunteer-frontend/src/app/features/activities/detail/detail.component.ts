import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { ActivityService } from '../../../core/services/activity.service';
import { Activity } from '../../../core/models/activity.model';
import { AuthService } from '../../../core/services/auth.service';
import { MatProgressSpinner } from "@angular/material/progress-spinner";

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatProgressSpinner],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent implements OnInit {
  activity: Activity | null = null;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private activityService: ActivityService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.activityService.getById(id).subscribe({
        next: (act) => {
          this.activity = act;
          this.loading = false;
        },
        error: () => this.loading = false
      });
    }
  }

  applyForActivity() {
    if (this.activity && this.authService.isLoggedIn()) {
      // Здесь вызов метода подачи заявки (как в списке)
      // Можно использовать тот же activityService.applyForActivity(this.activity.id)
      alert('Заявка на ' + this.activity.name + ' отправлена!');
    } else {
      alert('Войдите в систему');
    }
  }
}