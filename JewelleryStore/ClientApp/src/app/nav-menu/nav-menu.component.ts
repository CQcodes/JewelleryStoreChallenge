import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit{
  isExpanded = false;
  public userEmail:string;
  public userRole: string;

  constructor(private authService:AuthService, private router:Router){}

  ngOnInit(){
    const user = this.authService.currentUserValue;
    this.userEmail = user.email;
    this.userRole = user.role;
  }

  logout(){
    if(confirm("Are you sure you want to logout ?")){
      this.authService.logout();
      this.router.navigate(['/login']);
    }
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
