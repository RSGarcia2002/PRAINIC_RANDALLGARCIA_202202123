import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ApprovedCoursesComponent } from './components/approved-courses/approved-courses.component';
import { NavbarComponent } from './components/navbar/navbar.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'create-post', component: CreatePostComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'profile/:id', component: ProfileComponent }, // Perfil de otro usuario
  { path: 'approved-courses', component: ApprovedCoursesComponent },
  { path: '**', redirectTo: 'login' } 
];
