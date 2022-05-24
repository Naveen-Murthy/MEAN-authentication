import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  userDetails: Object |any;

  constructor(private authService: AuthenticationService,
    private utilService: UtilService) {}

  ngOnInit(): void {
    this.getProfileDetails();
  }

  getProfileDetails() {
    this.utilService.showLoader();
    this.authService.profile().subscribe((res: any) => {
      this.utilService.hideLoader();
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
