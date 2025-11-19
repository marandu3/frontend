import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { CommonModule } from '@angular/common';
import { Homepage } from "./pages/homepage/homepage";
import { About } from "./pages/about/about";
import { Project } from './pages/project/project';
import { Contact } from "./pages/contact/contact";
import { Education } from './pages/education/education';
import { Timeline } from './pages/timeline/timeline';



@Component({
  selector: 'app-root',
  imports: [Navbar, CommonModule, Homepage, About, Project, Contact, Education, Timeline],
  templateUrl: './app.html',
  styleUrl: './app.css',
  standalone: true
})
export class App {
  protected readonly title = signal('frontend');
   constructor(public router: Router) {}



}
