// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
// import { TutorialsListComponent } from './components/tutorials-list/tutorials-list.component';
// import { TutorialDetailsComponent } from './components/tutorial-details/tutorial-details.component';
// import { AddTutorialComponent } from './components/add-tutorial/add-tutorial.component';

// const routes: Routes = [
//   { path: '', redirectTo: 'tutorials', pathMatch: 'full' },
//   { path: 'tutorials', component: TutorialsListComponent },
//   { path: 'tutorials/:id', component: TutorialDetailsComponent },
//   { path: 'add', component: AddTutorialComponent }
// ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { MatchComponent } from './match/match.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SearchComponent } from './search/search.component';
import { BookingComponent } from './booking/booking.component';

const routes: Routes = [
  { path: '', component: HomeComponent }, // Home route
  { path: 'register', component: RegisterComponent }, // Truck registration route
  { path: 'match', component: MatchComponent }, // Route match component
  { path: 'dashboard', component: DashboardComponent }, // Dashboard for logged-in users
  { path: 'search', component: SearchComponent }, 
  { path: 'booking/:id', component: BookingComponent }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
