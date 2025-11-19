import { Routes } from '@angular/router';
import { Homepage } from './pages/homepage/homepage';
import { Contact } from './pages/contact/contact';
import { About } from './pages/about/about';
import { Project } from './pages/project/project';
import { Education } from './pages/education/education';
import { Timeline } from './pages/timeline/timeline';

export const routes: Routes = [
    {
        path: '',
        component: Homepage
    },
    {
        path: 'about',
        component: About
    },
    {
        path:'education',
        component:Education
    },
    {
        path: 'contact',
        component: Contact
    },
    {
        path: 'projects',
        component: Project
    },
    {
        path: 'timeline',
        component: Timeline
    },
    {
        path: '**',
        redirectTo: ''
    }
];
