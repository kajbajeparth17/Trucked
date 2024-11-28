import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
})
export class BookingComponent implements OnInit {
  truck: any = null;
  bookingFare: number = 0;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    const truckId = this.route.snapshot.paramMap.get('id');
    if (truckId) {
      this.fetchTruck(truckId);
    }
  }

  fetchTruck(truckId: string): void {
    this.http.get(`http://localhost:3000/trucks/${truckId}`).subscribe({
      next: (data) => {
        this.truck = data;
        this.calculateFare();
      },
      error: (err) => console.error('Error fetching truck:', err),
    });
  }

  calculateFare(): void {
    // Example fare calculation based on capacity
    if (this.truck) {
      this.bookingFare = this.truck.capacity * 100; // Assume ₹100 per capacity unit
    }
  }

  confirmBooking(): void {
    if (this.truck) {
      this.http.delete(`http://localhost:3000/trucks/${this.truck.id}`).subscribe({
        next: () => {
          alert('Booking confirmed!');
          this.router.navigate(['/search']);
        },
        error: (err) => console.error('Error confirming booking:', err),
      });
    }
  }
}
