import { Component } from '@angular/core';
import { ProfileComponent } from "../profile/profile";

@Component({
  selector: 'app-admindashboard',
  standalone: true,
  imports: [ProfileComponent],
  templateUrl: './admindashboard.html',
  styleUrl: './admindashboard.css'
})
export class Admindashboard {

}
