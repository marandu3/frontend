import { Component, Output, EventEmitter } from '@angular/core';
import { routes } from '../../app.routes';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-admin-navbar',
  standalone: true,
  imports:[RouterLink, RouterLinkActive],
  templateUrl: './admin-navbar.html',
  styleUrls: ['./admin-navbar.css']
})
export class AdminNavbar {

  @Output() backToPublicEvent = new EventEmitter<void>();

  backToPublic() {
    this.backToPublicEvent.emit();
  }

}
