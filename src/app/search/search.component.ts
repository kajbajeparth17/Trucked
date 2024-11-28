import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  trucks: any[] = []; // All available trucks
  filteredTrucks: any[] = []; // Filtered trucks based on search criteria
  from: string = ''; // From route
  to: string = ''; // To route
  capacity: number | null = null; // Filter for capacity
  startDate: string | null = null; // Filter for date
  goodtype: string = ''; // Filter for type of goods

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchTrucks();
  }

  // Fetches trucks data from the mock database
  fetchTrucks(): void {
    this.http.get<any[]>('http://localhost:3000/trucks').subscribe({
      next: (data) => {
        this.trucks = data;
        this.filteredTrucks = data; // Show all trucks by default
      },
      error: (err) => console.error('Error fetching trucks:', err),
    });
  }

  // Function to filter trucks based on input criteria
  filterTrucks(): void {
    let routeSearch = `${this.from} to ${this.to}`.trim().toLowerCase();
    this.filteredTrucks = this.trucks.filter(truck => {
      const routeMatch = truck.from.toLowerCase().includes(this.from.toLowerCase()) &&
                         truck.to.toLowerCase().includes(this.to.toLowerCase());
      const capacityMatch = this.capacity ? truck.capacity >= this.capacity : true;
      const dateMatch = this.startDate ? truck.startDate === this.startDate : true;
      const goodTypeMatch = this.goodtype ? truck.goodtype.toLowerCase().includes(this.goodtype.toLowerCase()) : true;

      return routeMatch && capacityMatch && dateMatch && goodTypeMatch;
    });
  }
}
