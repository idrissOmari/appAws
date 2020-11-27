import { Action } from 'rxjs/internal/scheduler/Action';
import { CustomAction } from 'src/app/shared/store/actions';

export const SET_FILTER = '[PHOTOS] set filter';
export const FETCH_PHOTOS = '[PHOTOS] fetch photos';
export const FETCH_PHOTOS_SUCCESS = '[PHOTOS] fetch photos success';

export class SetFilter implements CustomAction {
  type = SET_FILTER;
  constructor(public payload: string) {}
}

export class FetchPhotos implements CustomAction {
  type = FETCH_PHOTOS;
}
export class FetchPhotoSuccess implements CustomAction {
  type = FETCH_PHOTOS_SUCCESS;
  constructor(public payload: any[]) {}
}

export type PhotosAction = SetFilter | FetchPhotos | FetchPhotoSuccess ;
