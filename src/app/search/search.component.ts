import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  trucks: any[] = [];
  filteredTrucks: any[] = [];
  from: string = '';
  to: string = '';
  capacity: number | null = null;
  startDate: string | null = null;
  goodtype: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.fetchTrucks();
  }

  fetchTrucks(): void {
    this.http.get<any[]>('http://localhost:3000/trucks').subscribe({
      next: (data) => {
        this.trucks = data;
        this.filteredTrucks = data;
      },
      error: (err) => console.error('Error fetching trucks:', err),
    });
  }

  filterTrucks(): void {
    this.filteredTrucks = this.trucks.filter((truck) => {
      const routeMatch =
        truck.from.toLowerCase().includes(this.from.toLowerCase()) &&
        truck.to.toLowerCase().includes(this.to.toLowerCase());
      const capacityMatch = this.capacity ? truck.capacity >= this.capacity : true;
      const dateMatch = this.startDate ? truck.startDate === this.startDate : true;
      const goodTypeMatch = this.goodtype
        ? truck.goodtype.toLowerCase().includes(this.goodtype.toLowerCase())
        : true;

      return routeMatch && capacityMatch && dateMatch && goodTypeMatch;
    });
  }

  bookTruck(truckId: string): void {
    // Navigate to the booking component with the truck ID as a parameter
    this.router.navigate(['/booking', truckId]);
  }
}
