import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  imagesData: any = [];

  constructor(
    private dashboardService: DashboardService,
    private utilService: UtilService,
    ) {}

  ngOnInit(): void {
    this.loadImages(1, 80);
  }

  loadImages(pageNuber: number,itmsPerPage:number,){
    this.utilService.showLoader();
    this.dashboardService.getImages('curated/',pageNuber,itmsPerPage).subscribe((res: any) => {
      this.utilService.hideLoader();
      this.imagesData=res.photos || [];
    });
  }
}
