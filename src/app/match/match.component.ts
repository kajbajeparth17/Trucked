import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss']
})
export class MatchComponent implements OnInit {
  trucks: any[] = [];
  matches: any[] = [];
  processedPairs: Set<string> = new Set(); // To track unique pairs

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.http.get<any>('http://localhost:3000/trucks').subscribe({
      next: (data) => {
        this.trucks = data;
        this.http.get<any>('http://localhost:3000/matches').subscribe({
          next: (matchData) => {
            this.matches = matchData;
            this.generateMatches();
          },
          error: (err) => console.error('Error fetching matches:', err),
        });
      },
      error: (err) => console.error('Error fetching trucks:', err),
    });
  }

  generateMatches(): void {
    const newMatches: any[] = [];

    for (let i = 0; i < this.trucks.length; i++) {
      for (let j = i + 1; j < this.trucks.length; j++) {
        const truckA = this.trucks[i];
        const truckB = this.trucks[j];

        // Match only if routes are the same
        if (truckA.route === truckB.route) {
          const pairKey = this.getPairKey(truckA.id, truckB.id);

          // Check if the pair is already processed or exists in the database
          if (!this.processedPairs.has(pairKey) && !this.matchExists(pairKey)) {
            const sharedCapacity = Math.min(truckA.capacity, truckB.capacity);

            // Add match only if capacity can be fully shared
            if (sharedCapacity === truckA.capacity || sharedCapacity === truckB.capacity) {
              const newMatch = {
                id: this.generateUniqueId(),
                truckId: truckB.capacity > truckA.capacity ? truckA.id : truckB.id,
                matchedTruckId: truckB.capacity > truckA.capacity ? truckB.id : truckA.id,
                matchDetails: `Capacity shared: 100%`
              };

              newMatches.push(newMatch);
              this.processedPairs.add(pairKey); // Mark this pair as processed
            }
          }
        }
      }
    }

    this.matches = [...this.matches, ...newMatches];
    console.log('Generated Matches:', this.matches);

    // Optionally persist the matches to the backend
    this.saveMatches(newMatches);
  }

  matchExists(pairKey: string): boolean {
    const [id1, id2] = pairKey.split('-');
    return this.matches.some(
      (match) =>
        (match.truckId === id1 && match.matchedTruckId === id2) ||
        (match.truckId === id2 && match.matchedTruckId === id1)
    );
  }

  getPairKey(id1: string, id2: string): string {
    return [id1, id2].sort().join('-'); // Ensure consistent ordering
  }

  generateUniqueId(): string {
    return Math.random().toString(36).substring(2, 8); // Random 6-character string
  }

  saveMatches(newMatches: any[]): void {
    newMatches.forEach((match) => {
      this.http.post('http://localhost:3000/matches', match).subscribe({
        next: (response) => console.log('Match saved:', response),
        error: (err) => console.error('Error saving match:', err),
      });
    });
  }
}
