import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HEROES } from '../mock-heroes';

//Specifies the Angular metadata for the component 
@Component({
  /*
  CSS element selector matches the name of the HTML element 
  that identifies this component within a parent component’s template.
  */
  selector: 'app-heroes', 
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'] //private style to override global styles 
})
export class HeroesComponent implements OnInit {
  hero : Hero = {
    id : 1,
    name : 'Windstorm'
  };

  heroes = HEROES; //Expose the HEROES array for binding 

  selectedHero: Hero;
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  constructor() { }

  /*
  A lifecycle hook. Angular calls this method shortly after creating a component.
  */
  ngOnInit() {
  }



}
