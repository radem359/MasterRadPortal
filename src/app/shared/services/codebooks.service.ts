import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CodebooksService {

  constructor(private http: HttpClient) { }

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  getCodebook(codebooks: string[]): Observable<Object> {
    const params = codebooks.join();
    const url = environment.serverUrl + '/codebook/get?codebook=' + params;
    return new Observable((o: any) => {
      this.http.get(url, { headers: this.httpHeaders }).subscribe(
        (data: Object) => {
          const result: Object = data;
          o.next(result);
          return o.complete();
        });
    });
  }

}