import { NgModule } from '@angular/core';
import { PhotosComponent } from './photos.component';
import { LayoutModule } from '../shared/modules/layout.module';
import { RouterModule } from '@angular/router';
import { PHOTOS_ROUTES } from './photos.routes';



@NgModule({
  declarations: [PhotosComponent],
  imports: [
    LayoutModule,
    RouterModule.forChild(PHOTOS_ROUTES)
  ]
})
export class PhotosModule { }
