import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Author } from '../model/author';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(private http: HttpClient) { }

  form: FormGroup = new FormGroup({
    $id: new FormControl(null),
    authorName: new FormControl('', Validators.required),
    nationality: new FormControl(null, Validators.required),
    books: new FormControl(null)
  });

  initializeFormGroup(): void{
    this.form.setValue({
      $id: null,
      authorName: '',
      books: null,
      nationality: null
    });
  }

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  getAuthors(): Observable<Author[]> {
    const url = environment.serverUrl + 'author/get';
    console.log('getAuthors = ' + url);
    return new Observable((o: any) => {
      this.http.get(url, { headers: this.httpHeaders }).subscribe(
        (data: Author[]) => {
          const result: Author[] = data;
          o.next(result);
          return o.complete();
        });
    });
  }

  saveAuthor(author: Author): Observable<Author> {
    const url = environment.serverUrl + 'author/save';
    console.log('saveAuthor = ' + url, author);
    return new Observable((o: any) => {
      this.http.post(url, author, { headers: this.httpHeaders }).subscribe(
        (data: Author) => {
          const result: Author = data;
          o.next(result);
          return o.complete();
        });
    });
  }

  updateAuthor(author: Author): Observable<Author> {
    const url = environment.serverUrl + 'author/update';
    console.log('updateAuthor = ' + url, author);
    return new Observable((o: any) => {
      this.http.post(url, author, { headers: this.httpHeaders }).subscribe(
        (data: Author) => {
          const result: Author = data;
          o.next(result);
          return o.complete();
        });
    });
  }

  removeAuthor(id: number): Observable<object> {
    const url = environment.serverUrl + 'author/remove?id=' + id;

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
