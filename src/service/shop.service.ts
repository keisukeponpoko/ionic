import { Injectable }    from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Observable }     from 'rxjs/Observable';

@Injectable()
export class ShopService {
  // private headers = new Headers({'Content-Type': 'application/json'});
  private apiUrl = 'http://localhost:8000/api/shops';  // URL to web api
  constructor(private http: Http) { }

  search(category): Observable<any> {
    let url = `${this.apiUrl}/`;
    if (category) {
      url = `${this.apiUrl}/category/${category}/`;
    }
    return this.http.get(url).map(res=>res.json());
  }

  get(id): Observable<any> {
    const url = `${this.apiUrl}/${id}/`;
    return this.http.get(url)
      .map(res=>res.json());
  }
  // getTask(id: number): Promise<Hero> {
  //   const url = `${this.heroesUrl}/${id}`;
  //   return this.http.get(url)
  //     .toPromise()
  //     .then(response => response.json().data as Hero)
  //     .catch(this.handleError);
  // }
  // delete(id: number): Promise<void> {
  //   const url = `${this.heroesUrl}/${id}`;
  //   return this.http.delete(url, {headers: this.headers})
  //     .toPromise()
  //     .then(() => null)
  //     .catch(this.handleError);
  // }
  // update(hero: Hero): Promise<Hero> {
  //   const url = `${this.heroesUrl}/${hero.id}`;
  //   return this.http
  //     .put(url, JSON.stringify(hero), {headers: this.headers})
  //     .toPromise()
  //     .then(() => hero)
  //     .catch(this.handleError);
  // }
  // private handleError(error: any): Promise<any> {
  //   console.error('An error occurred', error); // for demo purposes only
  //   return Promise.reject(error.message || error);
  // }
  // search(term: string): Observable<Task[]> {
  //   return this.http
  //              .get(`${this.tasksUrl}/?name=${term}`)
  //              .map(response => response.json().data as Task[]);
  // }
}
