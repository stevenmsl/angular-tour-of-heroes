import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  //external component will bind to it
  @Input() hero: Hero; 
  constructor(
    private route: ActivatedRoute, //holds information about the route to this instance of the HeroDetailComponent
    private heroService: HeroService,
    private location: Location // for interacting with the browser
  ) { }

  ngOnInit() {
    this.getHero();
  }

  getHero(): void {
    //The route.snapshot is a static image of the route information shortly after the component was created.
    //The paramMap is a dictionary of route parameter values extracted from the URL. 
    //JavaScript (+) operator converts the string to a number
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();  
  }

}
