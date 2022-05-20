import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    private httpService: HttpService,
    private router: Router,
    private toast: ToastrService
  ) {}

  register(request: any): Observable<any> {
    const url = '/register';
    return this.httpService.Post(url, request);
  }

  login(request: any): Observable<any> {
    const url = '/authentication';
    return this.httpService.Post(url, request);
  }

  loggedIn() {
    return this.tokenNotExpired();
  }

  logout() {
    localStorage.clear();
    sessionStorage.clear();
    this.toast.success('You logged out successfully.', 'Logout');
    this.router.navigate(['/login']);
  }

  private tokenNotExpired() {
    const jwtService: JwtHelperService = new JwtHelperService();
    const item: any = sessionStorage.getItem('token');
    return item != null && !jwtService.isTokenExpired(item);
  }
}
