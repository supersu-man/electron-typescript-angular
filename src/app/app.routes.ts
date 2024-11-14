import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UpdateWindowComponent } from './update-window/update-window.component';

export const routes: Routes = [
    { path:"", component: HomeComponent },
    { path:"update", component: UpdateWindowComponent }
];
