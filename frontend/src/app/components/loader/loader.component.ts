import { Component, OnInit } from '@angular/core';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit {
  showLoader: boolean = false;
  constructor(
    private utilService : UtilService
  ) {}

  ngOnInit(): void {
    this.utilService.getLoader().subscribe((val:any) => {
      this.showLoader = val;
    });
  }
}
