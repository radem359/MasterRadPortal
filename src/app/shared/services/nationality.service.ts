import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Nationality } from '../model/nationality';
import * as _ from 'lodash';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class NationalityService {

  constructor(private http: HttpClient) { }

  form: FormGroup = new FormGroup({
    $id: new FormControl(null),
    nationalityName: new FormControl('', Validators.required),
    authors: new FormControl(null)
  });

  initializeFormGroup(): void{
    this.form.setValue({
      $id: null,
      nationalityName: '',
      authors: null
    });
  }

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  
  getNationalities(): Observable<Nationality[]> {
    const url = environment.serverUrl + 'nationality/get';
    console.log('getNationalities = ' + url);
    return new Observable((o: any) => {
      this.http.get(url, { headers: this.httpHeaders }).subscribe(
        (data: Nationality[]) => {
          const result: Nationality[] = data;
          o.next(result);
          return o.complete();
        });
    });
  }

  saveNationality(nationality: Nationality): Observable<Nationality> {
    const url = environment.serverUrl + 'nationality/save';
    console.log('saveNationality = ' + url, nationality);
    return new Observable((o: any) => {
      this.http.post(url, nationality, { headers: this.httpHeaders }).subscribe(
        (data: Nationality) => {
          const result: Nationality = data;
          o.next(result);
          return o.complete();
        });
    });
  }

  updateNationality(nationality: Nationality): Observable<Nationality> {
    const url = environment.serverUrl + 'nationality/update';
    console.log('updateNationality = ' + url, nationality);
    return new Observable((o: any) => {
      this.http.post(url, nationality, { headers: this.httpHeaders }).subscribe(
        (data: Nationality) => {
          const result: Nationality = data;
          o.next(result);
          return o.complete();
        });
    });
  }

  removeNationality(id: number): Observable<object> {
    const url = environment.serverUrl + 'nationality/remove?id=' + id;

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
