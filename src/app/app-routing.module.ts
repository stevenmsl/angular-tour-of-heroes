//use "ng generate module app-routing --flat --module=app" to create this module
// --flat puts the file in src/app folder instead of its own folder 
// --module=app tells the CLI to register it in the imports array of the AppModule  
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { fromEventPattern } from 'rxjs';

//tell router which view to display when a user clicks a link or paste a URL into the address 
const routes: Routes = [
  { 
    path: 'heroes', //a string that matches the URL in the browser address bar   
    component: HeroesComponent //the component that the router should create when navigating to this route
  },
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  { path: 'detail/:id', component: HeroDetailComponent }
];

@NgModule({
  declarations: [],
  imports: [
    /*
    - configure the router at the application’s root level 
    - supplies the service providers and directives needed for routing - routes 
    - performs the initial navigation based on the current browser URL  
    */
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule] //the router module can be available throughout the app
})
export class AppRoutingModule { }
