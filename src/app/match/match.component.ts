import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss']
})
export class MatchComponent implements OnInit {
  matches: any[] = []; // List of matches

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchMatches();
  }

  // Fetches match data from the mock database
  fetchMatches(): void {
    this.http.get<any[]>('http://localhost:3000/matches').subscribe({
      next: (data) => {
        this.matches = data;
      },
      error: (err) => console.error('Error fetching matches:', err),
    });
  }
}
