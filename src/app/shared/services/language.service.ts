import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Language } from '../model/language';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor(private http: HttpClient) { }

  form: FormGroup = new FormGroup({
    $id: new FormControl(null),
    languageName: new FormControl('', Validators.required),
    books: new FormControl(null)
  });

  initializeFormGroup(): void{
    this.form.setValue({
      $id: null,
      languageName: '',
      books: null
    });
  }

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  getLanguages(): Observable<Language[]> {
    const url = environment.serverUrl + 'language/get';
    console.log('getLanguages = ' + url);
    return new Observable((o: any) => {
      this.http.get(url, { headers: this.httpHeaders }).subscribe(
        (data: Language[]) => {
          const result: Language[] = data;
          o.next(result);
          return o.complete();
        });
    });
  }

  saveLanguage(language: Language): Observable<Language> {
    const url = environment.serverUrl + 'language/save';
    console.log('saveLanguage = ' + url, language);
    return new Observable((o: any) => {
      this.http.post(url, language, { headers: this.httpHeaders }).subscribe(
        (data: Language) => {
          const result: Language = data;
          o.next(result);
          return o.complete();
        });
    });
  }

  updateLanguage(language: Language): Observable<Language> {
    const url = environment.serverUrl + 'language/update';
    console.log('updateLanguage = ' + url, language);
    return new Observable((o: any) => {
      this.http.post(url, language, { headers: this.httpHeaders }).subscribe(
        (data: Language) => {
          const result: Language = data;
          o.next(result);
          return o.complete();
        });
    });
  }

  removeLanguage(id: number): Observable<object> {
    const url = environment.serverUrl + 'language/remove?id=' + id;

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
