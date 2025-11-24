import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-admin-navbar',
  standalone: true,
  templateUrl: './admin-navbar.html',
  styleUrls: ['./admin-navbar.css']
})
export class AdminNavbar {

  @Output() backToPublicEvent = new EventEmitter<void>();

  backToPublic() {
    this.backToPublicEvent.emit();
  }

}
