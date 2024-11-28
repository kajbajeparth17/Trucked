import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  totalTrucks: number = 0; // Total number of registered trucks
  totalMatches: number = 0; // Total number of matches found

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchDashboardData();
  }

  /**
   * Fetches data for the dashboard by making API calls.
   */
  fetchDashboardData(): void {
    // Fetch trucks count
    this.http.get<any[]>('http://localhost:3000/trucks').subscribe({
      next: (trucks) => {
        this.totalTrucks = trucks.length;

        // Fetch matches count
        this.http.get<any[]>('http://localhost:3000/matches').subscribe({
          next: (matches) => {
            this.totalMatches = matches.length;
          },
          error: (err) => console.error('Error fetching matches:', err),
        });
      },
      error: (err) => console.error('Error fetching trucks:', err),
    });
  }
}
