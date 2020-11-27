import { NgModule } from '@angular/core';
import { PhotosComponent } from './photos.component';
import { LayoutModule } from '../shared/modules/layout.module';
import { RouterModule } from '@angular/router';
import { PHOTOS_ROUTES } from './photos.routes';
import { PhotosService } from './shared/service/photos.service';
import { StoreModule } from '@ngrx/store';
import { photosReducer } from './shared/store/reducers/photos.reducer';
import { EffectsModule } from '@ngrx/effects';



@NgModule({
  declarations: [PhotosComponent],
  imports: [
    LayoutModule,
    RouterModule.forChild(PHOTOS_ROUTES),
    StoreModule.forFeature('photos', photosReducer),
    EffectsModule.forFeature([])
  ],
  providers: [
    PhotosService
  ]
})
export class PhotosModule { }
