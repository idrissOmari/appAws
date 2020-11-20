import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Modules
import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from './shared/modules/core.module';

// Components
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';

// routing
import { APP_ROUTING } from './app.routing';
import { ProfileModule } from './profile/profile.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CoreModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(APP_ROUTING)
  ],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule { }
