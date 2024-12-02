import { Routes } from '@angular/router';
import { DataComponent } from './data/data.component';
import { AboutComponent } from './pages/about/about.component';

export const routes: Routes = [
  { path: '', redirectTo: '/data', pathMatch: 'full' },
  { path: 'data', component: DataComponent },
  { path: 'about', component: AboutComponent },
];
