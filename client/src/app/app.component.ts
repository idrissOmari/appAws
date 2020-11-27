import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from './shared/services/auth.service';
import { State } from './shared/store';
import { TryRefreshToken } from './shared/store/actions/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(private store: Store<State>) {
    console.log('Build Appcomponent');
    this.store.dispatch(new TryRefreshToken());
  }
}
