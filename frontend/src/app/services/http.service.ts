import {
  HttpClient,
  HttpErrorResponse,
  HttpHandler,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

// Angular CLI configuration thing.
export interface IRequestOptions {
  headers?: HttpHeaders;
  observe?: 'body';
  params?: HttpParams;
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
  body?: any;
}

@Injectable({
  providedIn: 'root',
})
export class HttpService extends HttpClient{
  api:string='';
  constructor(
    handler: HttpHandler,
    private toast: ToastrService,
    private http: HttpClient,
    private router: Router
  ) {
    super(handler);
    this.api=environment.apiKey;
  }


  /**
   * GET request
   * @param {string} endPoint it doesn't need / in front of the end point
   * @param {IRequestOptions} options options of the request like headers, body, etc.
   * @param {string} api use if there is needed to send request to different back-end than the default one.
   * @returns {Observable<T>}
   */
   public Get<T>(endPoint: string, options?: IRequestOptions): Observable<any> {
    return this.http.get<T>(this.api + endPoint, options).pipe(
      catchError((err,caught)=>{
        let error = this.handleHttpError(err);
        return error;
      })
    );
  }

  /**
   * POST request
   * @param {string} endPoint end point of the api
   * @param {Object} params body of the request.
   * @param {IRequestOptions} options options of the request like headers, body, etc.
   * @returns {Observable<T>}
   */
  public Post<T>(endPoint: string, params: Object, options?: IRequestOptions): Observable<any> {
    return this.http.post<T>(this.api + endPoint, params, options).pipe(
      catchError((err,caught)=>{
        let error = this.handleHttpError(err);
        return error;
      })
    );
  }

  /**
   * PUT request
   * @param {string} endPoint end point of the api
   * @param {Object} params body of the request.
   * @param {IRequestOptions} options options of the request like headers, body, etc.
   * @returns {Observable<T>}
   */
  public Put<T>(endPoint: string, params: Object, options?: IRequestOptions): Observable<any> {
    return this.http.put<T>(this.api + endPoint, params, options).pipe(
      catchError((err,caught)=>{
        let error = this.handleHttpError(err);
        return error;
      })
    );
  }

  /**
   * DELETE request
   * @param {string} endPoint end point of the api
   * @param {IRequestOptions} options options of the request like headers, body, etc.
   * @returns {Observable<T>}
   */
  public Delete<T>(endPoint: string, options?: IRequestOptions): Observable<any> {
    return this.http.delete<T>(this.api + endPoint, options).pipe(
      catchError((err,caught)=>{
        let error = this.handleHttpError(err);
        return error;
      })
    );
  }

  /**
   * GET request
   * @param {string} endPoint it doesn't need / in front of the end point
   * @param {IRequestOptions} options options of the request like headers, body, etc.
   * @param {string} api use if there is needed to send request to different back-end than the default one.
   * @returns {Observable<T>}
   */
   public getCall<T>(api:string, endPoint: string, options?: IRequestOptions): Observable<any> {
    return this.http.get<T>(api + endPoint, options).pipe(
      catchError((err,caught)=>{
        let error = this.handleHttpError(err);
        return error;
      })
    );
  }

  handleHttpError(error: HttpErrorResponse): any {
    if (error.status != 200) {
      if (error.status == 401) {
        this.toast.error('Session timeout please login', 'Error');
        setTimeout(() => {
          this.router.navigate(['./login']);
        }, 3000);
        return throwError(()=>error);
      } else {
        return throwError(()=>error);
      }
    }
  }
}
