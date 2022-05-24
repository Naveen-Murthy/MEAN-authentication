import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  menuBlock:boolean=false;

  constructor(
    public authService: AuthenticationService
  ) { }

  ngOnInit(): void {
  }

  logout(){
    this.authService.logout();
    return false;
  }

  menuOpen(){
    this.menuBlock=!this.menuBlock;
  }

  clickedOut(event:any){
    if(event){
      this.menuBlock =false;
    }
  }

}
