import { Route } from '@angular/router';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthGuard } from './shared/guards/auth.guard';

export const APP_ROUTING: Route[] = [
  {
    path: '',
    redirectTo: 'photos',
    pathMatch: 'full' }
  ,
  {
    path: 'photos',
    loadChildren:  () => import('./photos/photos.module').then(m => m.PhotosModule)
  },
  {path: 'signup', component: SignupComponent},
  {path: 'signin', component: SigninComponent},
  {
    path: 'profile',
    canActivate: [AuthGuard],
    loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)
  },
];
