import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Book } from '../model/book';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  form: FormGroup = new FormGroup({
    $id: new FormControl(null),
    bookName: new FormControl('', Validators.required),
    isbnNumber: new FormControl('', Validators.required),
    bookDescription: new FormControl(''),
    authors: new FormControl(null, Validators.required),
    language: new FormControl(null, Validators.required),
    genres: new FormControl(null, Validators.required),
    user: new FormControl(null, Validators.required)
  });

  initializeFormGroup(): void{
    this.form.setValue({
      $id: null,
      bookName: '',
      isbnNumber: '',
      bookDescription: '',
      authors: null,
      language: null,
      genres: null,
      user: null
    });
  }

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  getBooks(): Observable<Book[]> {
    const url = environment.serverUrl + 'book/get';
    console.log('getBooks = ' + url);
    return new Observable((o: any) => {
      this.http.get(url, { headers: this.httpHeaders }).subscribe(
        (data: Book[]) => {
          const result: Book[] = data;
          o.next(result);
          return o.complete();
        });
    });
  }

  saveBook(book: Book): Observable<Book>{
    const url = environment.serverUrl + 'book/save';
    console.log('saveBook = ' + url, book);
    return new Observable((o: any) => {
    this.http.post(url, book, { headers: this.httpHeaders }).subscribe(
        (data: Book) => {
          const result: Book = data;
          o.next(result);
          return o.complete();
        });
    });
  }

  updateBook(book: Book): Observable<Book>{
    const url = environment.serverUrl + 'book/update';
    console.log('updateBook = ' + url, book);
    return new Observable((o: any) => {
    this.http.post(url, book, { headers: this.httpHeaders }).subscribe(
        (data: Book) => {
          const result: Book = data;
          o.next(result);
          return o.complete();
        });
    });
  }

  removeBook(id: number): Observable<object> {
    const url = environment.serverUrl + 'book/remove?id=' + id;

    console.log("removeBook", url);
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
