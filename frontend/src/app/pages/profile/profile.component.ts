import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { base64ToFile } from 'ngx-image-cropper';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  userDetails: Object |any;
  profilePic: any = '';
  profilePicModel:boolean = false;
  profileImage: any = '';

  constructor(private authService: AuthenticationService,
    private utilService: UtilService,
    private sanitizer : DomSanitizer) {}

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

  setProfilePic(){
    var imageBlob: Blob = base64ToFile(this.profilePic);
    var imageName: string = 'naveen';
    var imageFile: File = new File([imageBlob], imageName, {
      type: "image/jpeg"
    });
    var blobImage = window.URL.createObjectURL(imageFile);
    // Opens image in new tab
    // window.open(blobImage);
    this.profilePicModel = !this.profilePicModel;
    this.profileImage = this.sanatizeUrl(blobImage);
  }

  sanatizeUrl(generatedImageUrl:any): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(generatedImageUrl);
  }
}
