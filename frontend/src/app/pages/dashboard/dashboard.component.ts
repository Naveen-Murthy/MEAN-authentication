import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DashboardService } from 'src/app/services/dashboard.service';
import { ImageService } from 'src/app/services/image.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  imagesData: any = [];
  downloadModal:boolean = false;
  imgData: any;
  searchForm:any;

  constructor(
    private dashboardService: DashboardService,
    private utilService: UtilService,
    private imgService: ImageService,
    private formBuilder: FormBuilder
    ) {}

  ngOnInit(): void {
    this.loadImages(1, 80);
    this.initializeForm();
  }

  loadImages(pageNumber: number,itmsPerPage:number,){
    this.utilService.showLoader();
    this.dashboardService.getImages('curated/',pageNumber,itmsPerPage).subscribe((res: any) => {
      this.utilService.hideLoader();
      this.imagesData=res.photos || [];
    });
  }

  downloadModalData(event:any){
    this.imgData=event;
    this.downloadModal= !this.downloadModal;
  }

  downloadImg(type:string){
    switch (type) {
      case 'original':
        this.imgService.downloadImg(this.imgData.src.original, this.imgData.alt);
        break;
      case 'portrait':
        this.imgService.downloadImg(this.imgData.src.portrait, this.imgData.alt);
        break;
      case 'landscape':
        this.imgService.downloadImg(this.imgData.src.landscape, this.imgData.alt);
        break;
      default:
        this.imgService.downloadImg(this.imgData.src.medium, this.imgData.alt);
        break;
    }
  }

  initializeForm() {
    this.searchForm = this.formBuilder.group({
      search: ['']
    });
  }

  searchData(){
    let pageNumber = 1;
    let itmsPerPage = 80;
    this.utilService.showLoader();
    this.dashboardService.searchImages(this.searchForm.value.search,pageNumber,itmsPerPage).subscribe((res: any) => {
      this.utilService.hideLoader();
      this.imagesData=res.photos || [];
    });
  }
}
