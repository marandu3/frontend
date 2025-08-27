import { Routes } from '@angular/router';
import { Homepage } from './pages/homepage/homepage';
import { Contact } from './pages/contact/contact';
import { About } from './pages/about/about';
import { Project } from './pages/project/project';

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
        path: 'contact',
        component: Contact
    },
    {
        path: 'projects',
        component: Project
    },
    {
        path: '**',
        redirectTo: ''
    }
];
