import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  totalTrucks: number = 0; // Total number of registered trucks
  totalMatches: number = 0; // Total number of matches found

  constructor() {}

  ngOnInit(): void {
    this.fetchDashboardData();
  }

  /**
   * Fetches data for the dashboard (simulated with mock data here).
   */
  fetchDashboardData(): void {
    // Simulating API call with mock data
    const mockData = {
      trucks: 25,
      matches: 12,
    };

    this.totalTrucks = mockData.trucks;
    this.totalMatches = mockData.matches;
  }
}