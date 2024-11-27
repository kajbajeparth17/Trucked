import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  newTruck = { route: '', capacity: 0 };

  constructor(private dataService: DataService) { }

  ngOnInit(): void {}

  registerTruck() {
    this.dataService.addTruck(this.newTruck).subscribe(response => {
      console.log('Truck Registered:', response);
    });
  }
}

