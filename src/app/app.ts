import { Component, signal, effect } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { AdminNavbar } from './components/admin-navbar/admin-navbar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Navbar, CommonModule, RouterOutlet, RouterLink, AdminNavbar],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {

  public admin = false;

  constructor(public router: Router) {
    this.loadAdminState();

    // Auto-refresh when storage changes (other tabs)
    window.addEventListener('storage', () => {
      this.loadAdminState();
    });
  }

  loadAdminState() {
    this.admin = localStorage.getItem('adminMode') === 'true';
  }

  enableAdmin() {
    localStorage.setItem('adminMode', 'true');
    this.loadAdminState();
    this.router.navigate(['/admindashboard']);
  }

  disableAdmin() {
    localStorage.removeItem('adminMode');
    this.loadAdminState();
    this.router.navigate(['/']);
  }
}
