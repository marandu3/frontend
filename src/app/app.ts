import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { AdminNavbar } from './components/admin-navbar/admin-navbar';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth/auth.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Navbar, CommonModule, RouterOutlet, AdminNavbar],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit {
  public admin = false;
  public isAuthenticated = false;
  public isAdminPage = false;
  private adminPages = [
    '/admindashboard',
    '/createprojects',
    '/createabout',
    '/createtimeline',
    '/createeducation'
  ];

  constructor(public router: Router, public authService: AuthService) {
    this.loadAdminState();

    window.addEventListener('storage', () => {
      this.loadAdminState();
    });
  }

  ngOnInit(): void {
    // Subscribe to auth status
    this.authService.getAuthStatus().subscribe(isAuth => {
      this.isAuthenticated = isAuth;
    });

    // Listen to route changes
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe((event: any) => {
        this.checkIfAdminPage(event.url);
      });
  }

  checkIfAdminPage(url: string): void {
    this.isAdminPage = this.adminPages.some(page => url.includes(page));
  }

  loadAdminState() {
    this.admin = localStorage.getItem('adminMode') === 'true';
  }

  enableAdmin() {
    this.router.navigate(['/login']);
    localStorage.setItem('adminMode', 'true');
    this.loadAdminState();
  }

  disableAdmin() {
    localStorage.removeItem('adminMode');
    localStorage.removeItem('auth_token');
    this.authService.logout();
    this.loadAdminState();
    this.router.navigate(['/']);
  }
}
