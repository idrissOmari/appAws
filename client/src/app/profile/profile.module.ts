import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PROFILE_ROUTES } from './profile.routes';
import { ProfileComponent } from './profile.component';
import { LayoutModule } from '../shared/modules/layout.module';

@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    LayoutModule,
    RouterModule.forChild(PROFILE_ROUTES),
  ]
})
export class ProfileModule { }
