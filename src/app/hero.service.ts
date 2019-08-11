import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes'; 
import { Observable, of } from 'rxjs'; 
import { MessageService } from './message.service';
//participate in the dependency injection system
@Injectable({
  providedIn: 'root' //register a provider with the root injector
                     //a single, shared instance will be created and injected into any class that asks for it 
})
export class HeroService {
  //service-in-service: the MessageService is inject into the HeroService 
  //which is injected into the Heroes Component 
  constructor(private messageService: MessageService) { }
  getHeroes(): Observable<Hero[]> {
    this.messageService.add('HeroService: fetched heroes');
    return of(HEROES); //returns an Observable that emits a single value, the array of mock heroes 
  }

}
