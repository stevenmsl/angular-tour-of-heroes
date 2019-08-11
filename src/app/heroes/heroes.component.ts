import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service'; 

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

  heroes : Hero[]; //Expose the HEROES array for binding 

  selectedHero: Hero;
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  getHeroes(): void {
    this.heroService.getHeroes()
        //the subscribe method passes the emitted array to the call back 
        .subscribe(heroes => this.heroes = heroes);
  }

  constructor(private heroService: HeroService) {}

  /*
  A lifecycle hook. Angular calls this method shortly after creating a component.
  */
  ngOnInit() {
    this.getHeroes();
  }

}
