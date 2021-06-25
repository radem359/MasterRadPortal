import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../model/user';
import * as _ from 'lodash';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  tryLog: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  register: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required)
  });

  loggedUser: FormGroup = new FormGroup({
    $id: new FormControl(null),
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    isAdmin: new FormControl(false),
    books: new FormControl(null)
  });

  form: FormGroup = new FormGroup({
    $id: new FormControl(null),
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    isAdmin: new FormControl(false),
    books: new FormControl(null)
  });

  removeRegister(): void{
    this.register.setValue({
      username: '',
      password: '',
      confirmPassword: ''
    });
  }

  initializeFormGroup(): void{
    this.form.setValue({
      $id: null,
      username: '',
      password: '',
      isAdmin: false,
      books: null
    });
  }

  logOut(): void{
    this.loggedUser.setValue({
      $id: null,
      username: '',
      password: '',
      isAdmin: false,
      books: null
    });
  }

  deleteTryLog(): void{
    this.tryLog.setValue({
      username: '',
      password: ''
    });
  }

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  
  getUsers(): Observable<User[]> {
    const url = environment.serverUrl + 'user/get';
    console.log('getUsers = ' + url);
    return new Observable((o: any) => {
      this.http.get(url, { headers: this.httpHeaders }).subscribe(
        (data: User[]) => {
          const result: User[] = data;
          o.next(result);
          return o.complete();
        });
    });
  }

  logIn(username: string, password: string): Observable<User> {
    const url = environment.serverUrl + 'user/login?username='+username+'&password='+password;
    console.log('logIn = ' + url);
    return new Observable((o: any) => {
      this.http.get(url, { headers: this.httpHeaders }).subscribe(
        (data: User) => {
          const result: User = data;
          o.next(result);
          return o.complete();
        });
    });
  }

  saveUser(user: User): Observable<User> {
    const url = environment.serverUrl + 'user/save';
    console.log('saveUser = ' + url, user);
    return new Observable((o: any) => {
      this.http.post(url, user, { headers: this.httpHeaders }).subscribe(
        (data: User) => {
          const result: User = data;
          o.next(result);
          return o.complete();
        });
    });
  }

  updateUser(user: User): Observable<User> {
    const url = environment.serverUrl + 'user/update';
    console.log('updateUser = ' + url, user);
    return new Observable((o: any) => {
      this.http.post(url, user, { headers: this.httpHeaders }).subscribe(
        (data: User) => {
          const result: User = data;
          o.next(result);
          return o.complete();
        });
    });
  }

  removeUser(id: number): Observable<object> {
    const url = environment.serverUrl + 'user/remove?id=' + id;

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

  logInUser(user){
    this.loggedUser.setValue(_.omit(user));
  }
}
