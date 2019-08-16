import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes'; 
import { Observable, of } from 'rxjs'; 
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
//participate in the dependency injection system
@Injectable({
  providedIn: 'root' //register a provider with the root injector
                     //a single, shared instance will be created and injected into any class that asks for it 
})
export class HeroService {

  //service-in-service: the MessageService is inject into the HeroService 
  //which is injected into the Heroes Component 
  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /*  
  getHeroes(): Observable<Hero[]> {
    this.log('HeroService: fetched heroes');
    return of(HEROES); //returns an Observable that emits a single value, the array of mock heroes 
  }
  */
  /*
  getHero(id: number): Observable<Hero> {
    //use backticks ( ` ) to define a JavaScript template literal for embedding the id
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(HEROES.find(hero => hero.id === id));
  }
  */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  // :base/:collectionName 
  private heroesUrl = 'api/heroes'; //URL to web api
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  getHeroes(): Observable<Hero[]> {
    /*
    An observable from HttpClient always emits a single value and then completes, never to emit again.
    */
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        // tap() operator, which looks at the observable values, 
        //does something with those values, and passes them along. 
        //The tap() call back doesn't touch the values themselves.        
        tap( _ => this.log('fetched heroes')),
        //The catchError() operator intercepts an Observable that failed. 
        //It passes the error an error handler that can do what it wants with the error.
        catchError(this.handleError<Hero[]>('getHeroes', []))  
      );
    ;  
  }

  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap( _ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))  
    );    
  }

   /** DELETE: delete the hero from the server */
   deleteHero(hero: Hero | number): Observable<Hero> {
      return null;  
   }


  /** PUT: update the hero on the server */
  updateHero(hero: Hero): Observable<any> {
    //heroes web API expects a special header in HTTP save requests
    //this is done through options 
    return this.http.put(this.heroesUrl, hero, this.httpOptions)
      .pipe(
        tap(_ => this.log(`updated hero id=${hero.id}`)),
        catchError(this.handleError<any>('updateHero'))
      );
  }
  
  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions)
      .pipe(
        tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
        catchError(this.handleError<Hero>(`addHero`))
      ); 
  }

  /*
   Handle Http operation that failed.
   Let the app continue.
   @param operation - name of the operation that failed
   @param result - optional value to return as the observable result
  */
  private handleError<T> (operation = 'operation', result?: T) {
    //returns an error handler function
    //configures the name of the failed operation and a safe return value  
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);      
    };    
  }

}
