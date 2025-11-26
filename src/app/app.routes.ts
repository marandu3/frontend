import { Routes } from '@angular/router';
import { Homepage } from './pages/homepage/homepage';
import { Contact } from './pages/contact/contact';
import { About } from './pages/about/about';
import { Project } from './pages/project/project';
import { Education } from './pages/education/education';
import { Timeline } from './pages/timeline/timeline';
import { Layout } from './pages/layout/layout';
import { Admindashboard } from './pages/adminpages/admindashboard/admindashboard';
import { Cprojects } from './pages/adminpages/cprojects/cprojects';
import { Ctimeline } from './pages/adminpages/ctimeline/ctimeline';
import { Ceducation } from './pages/adminpages/ceducation/ceducation';
import { Cabout } from './pages/adminpages/cabout/cabout';


export const routes: Routes = [
    {
        path: '',
        component: Layout
    },
    {
        path: 'homepage',
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
        path: 'admindashboard',
        component: Admindashboard
    },
    {
        path: 'createprojects',
        component:Cprojects
    },
    {
        path:'createabout',
        component: Cabout
    },
    {
        path:'createtimeline',
        component:Ctimeline
    },
    {
        path:'createeducation',
        component:Ceducation
    },
    {
        path: '**',
        redirectTo: ''
    }
];
