// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-register',
//   templateUrl: './register.component.html',
//   styleUrls: ['./register.component.scss'],
// })
// export class RegisterComponent {
//   from: string = ''; // Origin of the truck
//   to: string = ''; // Destination of the truck
//   capacity: number | null = null; // Truck capacity

//   constructor() {}

//   /**
//    * Handles the truck registration process.
//    */
//   registerTruck(): void {
//     if (this.from && this.to && this.capacity !== null) {
//       const route = `${this.from} → ${this.to}`; // Combine 'from' and 'to' into a route
//       const newTruck = {
//         route: route,
//         capacity: this.capacity,
//       };

//       console.log('Registered Truck:', newTruck);
//       // In a real application, you would send 'newTruck' to an API or service
//       alert(`Truck registered successfully:\nRoute: ${newTruck.route}\nCapacity: ${newTruck.capacity}`);
      
//       // Reset form fields after submission
//       this.from = '';
//       this.to = '';
//       this.capacity = null;
//     } else {
//       alert('Please fill out all fields.');
//     }
//   }
// }
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  from: string = ''; // Origin of the truck
  to: string = ''; // Destination of the truck
  capacity: number | null = null; // Truck capacity
  startDate: any ; // Origin of the truck
  goodtype: string = ''; // Destination of the truck
  constructor(private http: HttpClient) {}

  /**
   * Handles the truck registration process.
   */
  registerTruck(): void {
    if (this.from && this.to && this.capacity !== null && this.startDate && this.goodtype !== null) {
      const route = `${this.from} to ${this.to}`; // Combine 'from' and 'to' into a route
      const newTruck = {
        to: this.to,
        from: this.from,
        startDate: this.startDate,
        goodtype: this.goodtype,
        capacity: this.capacity,
      };

      // Post the new truck to the JSON Server
      this.http.post('http://localhost:3000/trucks', newTruck).subscribe({
        next: (response) => {
          console.log('Truck successfully registered:', response);
          alert(`Truck registered successfully:\nRoute: ${this.from}\n ${this.to}\nCapacity: ${newTruck.capacity}`);
          
          // Reset form fields after successful submission
          this.from = '';
          this.to = '';
          this.capacity = null;
          this.startDate = "";
          this.goodtype = '';
        },
        error: (error) => {
          console.error('Error registering truck:', error);
          alert('An error occurred while registering the truck Ride. Please try again.');
        },
      });
    } else {
      alert('Please fill out all fields.');
    }
  }
}