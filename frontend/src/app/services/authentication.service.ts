import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    private httpService: HttpService,
    private router: Router,
    private toast: ToastrService,
    private utilService: UtilService
  ) {}

  register(request: any): Observable<any> {
    const url = '/register';
    return this.httpService.Post(url, request);
  }

  login(request: any): Observable<any> {
    const url = '/authentication';
    return this.httpService.Post(url, request);
  }

  profile(): Observable<any> {
    const url = '/profile';
    const auth_token = this.utilService.getItemFromSessionStorage('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    })
    return this.httpService.Get(url, { headers: headers });
  }

  updateProfile(request: any): Observable<any> {
    const url = '/profileupdate';
    const auth_token = this.utilService.getItemFromSessionStorage('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    })
    return this.httpService.Post(url, request, { headers: headers });
  }

  loggedIn() {
    return this.tokenNotExpired();
  }

  clearData(){
    localStorage.clear();
    sessionStorage.clear();
  }

  logout() {
    this.clearData();
    this.toast.success('You logged out successfully.', 'Logout');
    this.router.navigate(['/login']);
  }

  private tokenNotExpired() {
    const jwtService: JwtHelperService = new JwtHelperService();
    const item: any = sessionStorage.getItem('token');
    return item != null && !jwtService.isTokenExpired(item);
  }
}
