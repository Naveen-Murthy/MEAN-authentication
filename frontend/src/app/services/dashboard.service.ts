import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private apiUrl: string = 'https://api.pexels.com/v1/';
  private pexelsApiKey: string =
    '563492ad6f91700001000001916fe1b8d0c748c5ba9880cc63f716a3';

  constructor(private httpService: HttpService) {}

  getImages(endPoint:string, page:number = 1, per_page:number = 80): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: this.pexelsApiKey,
    });
    let queryParams = new HttpParams();
    queryParams = queryParams.append('page', page);
    queryParams = queryParams.append('per_page', per_page);
    return this.httpService.getCall(this.apiUrl, endPoint, {
      headers: headers,
      params: queryParams,
    });
  }

  getCollections(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: this.pexelsApiKey,
    });
    let queryParams = new HttpParams();
    queryParams = queryParams.append('page', 1);
    queryParams = queryParams.append('per_page', 80);
    return this.httpService.getCall(this.apiUrl, 'curated/', {
      headers: headers,
      params: queryParams,
    });
  }
}
