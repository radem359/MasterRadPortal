import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Genre } from '../model/genre';
import * as _ from 'lodash';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  constructor(private http: HttpClient) { }

  form: FormGroup = new FormGroup({
    $id: new FormControl(null),
    genreName: new FormControl('', Validators.required),
    books: new FormControl(null)
  });

  initializeFormGroup(): void{
    this.form.setValue({
      $id: null,
      genreName: '',
      books: null
    });
  }

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  getGenres(): Observable<Genre[]> {
    const url = environment.serverUrl + 'genre/get';
    console.log('getGenres = ' + url);
    return new Observable((o: any) => {
      this.http.get(url, { headers: this.httpHeaders }).subscribe(
        (data: Genre[]) => {
          const result: Genre[] = data;
          o.next(result);
          return o.complete();
        });
    });
  }

  saveGenre(genre: Genre): Observable<Genre> {
    const url = environment.serverUrl + 'genre/save';
    console.log('saveGenre = ' + url, genre);
    return new Observable((o: any) => {
      this.http.post(url, genre, { headers: this.httpHeaders }).subscribe(
        (data: Genre) => {
          const result: Genre = data;
          o.next(result);
          return o.complete();
        });
    });
  }

  updateGenre(genre: Genre): Observable<Genre> {
    const url = environment.serverUrl + 'genre/update';
    console.log('updateGenre = ' + url, genre);
    return new Observable((o: any) => {
      this.http.post(url, genre, { headers: this.httpHeaders }).subscribe(
        (data: Genre) => {
          const result: Genre = data;
          o.next(result);
          return o.complete();
        });
    });
  }

  removeGenre(id: number): Observable<object> {
    const url = environment.serverUrl + 'genre/remove?id=' + id;

    return new Observable((o: any) => {
      this.http.get(url, { headers: this.httpHeaders }).subscribe(
        data => {
          o.next(id);
          return o.complete();
        });
    });
  }
  
  populateForm(book) {
    this.form.setValue(_.omit(book));
  }
}
