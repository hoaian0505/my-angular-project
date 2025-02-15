import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from 'src/enviroments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private _apiKey = environment.apiKey;

  constructor(private _http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'x-api-key': this._apiKey,
    });
  }

  /**
   * Wrapper for GET requests, automatically attaching API key header.
   * @param url API call URL
   * @param options (optional) Additional options.
   */
  public get<T>(url: string): Observable<T> {
    const options: { headers: HttpHeaders } = {
      headers: this.getHeaders(),
    };

    return this._http.get<T>(url, options).pipe(map((result) => result as T));
  }

  /**
   * Wrapper for POST requests, automatically attaching API key header.
   * @param url API call URL
   * @param body Additional options.
   */
  public post<T>(url: string, body: any): Observable<T> {
    const options: { headers: HttpHeaders } = {
      headers: this.getHeaders(),
    };
    return this._http
      .post<T>(url, body, options)
      .pipe(map((result) => result as T));
  }
}
