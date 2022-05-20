import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  userDetails: Object |any;

  constructor(private authService: AuthenticationService) {}

  ngOnInit(): void {
    this.getProfileDetails();
  }

  getProfileDetails() {
    this.authService.profile().subscribe((res: any) => {
      if (res.status) {
        this.userDetails = res.user;
      } else{
        this.userDetails = '';
      }
    },
    (err:any)=>{
      console.log(err);
      return false;
    });
  }
}
