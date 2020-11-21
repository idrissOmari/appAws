import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from 'src/environments/environment';

// Modules
import { CoreModule } from './shared/modules/core.module';

// Components
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';

// routing
import { APP_ROUTING } from './app.routing';
// ngrx
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducersMap } from './shared/store';
import { AuthEffects } from './shared/store/effects/auth.effects';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CoreModule,
    BrowserModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(reducersMap),
    StoreDevtoolsModule.instrument({
      name: 'Ngrx Photos',
      logOnly: environment.production
    }),
    EffectsModule.forRoot([
      AuthEffects
    ]),
    RouterModule.forRoot(APP_ROUTING)
  ],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule { }
