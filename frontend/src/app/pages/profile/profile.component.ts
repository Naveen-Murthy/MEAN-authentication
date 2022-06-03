import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { base64ToFile, ImageCroppedEvent } from 'ngx-image-cropper';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  userDetails: Object | any;
  profilePic: any = '';
  profilePicModel: boolean = false;
  profileImage: boolean = false;

  constructor(
    private authService: AuthenticationService,
    private utilService: UtilService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.getProfileDetails();
  }

  getProfileDetails() {
    this.utilService.showLoader();
    this.authService.profile().subscribe(
      (res: any) => {
        this.utilService.hideLoader();
        if (res.status) {
          this.userDetails = res.user;
          if (res.user.profile_pic) {
            this.profileImage = true;
            res.user.profile_pic = this.sanatizeUrl(res.user.profile_pic);
          } else {
            this.profileImage = false;
          }
        } else {
          this.userDetails = '';
        }
      },
      (err: any) => {
        console.log(err);
        this.utilService.hideLoader();
        return false;
      }
    );
  }

  setProfilePic() {
    var imageBlob: Blob = base64ToFile(this.profilePic);
    var imageName: string = this.userDetails.name.toLowerCase().toString();
    var imageFile: File = new File([imageBlob], imageName, {
      type: 'image/jpeg',
    });
    var blobImage = window.URL.createObjectURL(imageFile);
    // Opens image in new tab
    // window.open(blobImage);
    var body = {
      email: this.userDetails.email,
      profile_pic: this.profilePic,
    };
    this.utilService.showLoader();
    this.authService.updateProfile(body).subscribe((res: any) => {
      this.utilService.hideLoader();
      this.profilePicModel = !this.profilePicModel;
      this.getProfileDetails();
    });
  }

  sanatizeUrl(generatedImageUrl: any): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(generatedImageUrl);
  }

  onImgError() {
    this.profileImage = false;
  }
}
