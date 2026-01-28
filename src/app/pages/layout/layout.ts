import { Component } from '@angular/core';
import { Homepage } from '../homepage/homepage';
import { About } from '../about/about';
import { Project } from './../project/project';
import { Contact } from '../contact/contact';
import { Education } from './../education/education';
import { Timeline } from './../timeline/timeline';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [Homepage, About, Education, Project, Timeline, Contact],
  templateUrl: './layout.html',
  styleUrl: './layout.css'
})
export class Layout {

}
