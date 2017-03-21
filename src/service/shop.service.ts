import { Injectable }    from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Observable }     from 'rxjs/Observable';

@Injectable()
export class ShopService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private apiUrl = 'http://okaokake.sakura.ne.jp/lunch/api';  // URL to web api
  constructor(private http: Http) { }

  getShops(): Observable<any> {
    const url = `${this.apiUrl}/shops/`;
    return this.http.get(url).map(res=>res.json());
  }

  searchCategory(category): Observable<any> {
    const url = `${this.apiUrl}/shops/category/${category}/`;
    return this.http.get(url).map(res=>res.json());
  }

  getShop(id): Observable<any> {
    const url = `${this.apiUrl}/shops/${id}/`;
    return this.http.get(url).map(res=>res.json());
  }

  getPoints(): Observable<any> {
    const url = `${this.apiUrl}/points/`;
    return this.http.get(url).map(res=>res.json());
  }

  searchPoint(point): Observable<any> {
    const url = `${this.apiUrl}/shops/point/${point}/`;
    return this.http.get(url).map(res=>res.json());
  }

  postShopPoint(shopId, pointId): Observable<any> {
    const url = `${this.apiUrl}/shoppoints/`;
    return this.http
      .post(url, JSON.stringify({shop_id: shopId, point_id: pointId}), {headers: this.headers})
      .map(res=>res.json());
  }

  deleteShopPoint(id): Observable<any> {
    const url = `${this.apiUrl}/shoppoints/${id}/`;
    return this.http.delete(url, {headers: this.headers}).map(res=>res.json());
  }

  postComment(shopId, comment): Observable<any> {
    const url = `${this.apiUrl}/comments/`;
    return this.http
      .post(url, JSON.stringify({shop_id: shopId, comment: comment}), {headers: this.headers})
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
