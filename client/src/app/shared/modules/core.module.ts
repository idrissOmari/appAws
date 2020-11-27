import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { LayoutModule } from './layout.module';

// Components
import { SigninComponent } from 'src/app/components/signin/signin.component';
import { SignupComponent } from 'src/app/components/signup/signup.component';
import { TopbarComponent } from '../components/topbar/topbar.component';
// Services
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
// Interceptors
import { AuthInterceptor } from '../interceptors/auth.interceptor';
// Guards
import { AuthGuard } from '../guards/auth.guard';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

const MODULES = [
  LayoutModule,
  HttpClientModule,
  ReactiveFormsModule,
  RouterModule
];

const COMPONENTS = [
  SignupComponent,
  SigninComponent,
  TopbarComponent,
];
@NgModule({
  declarations: COMPONENTS,
  imports: MODULES,
  exports: [
    ...COMPONENTS
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    AuthService,
    AuthGuard,
    UserService,
  ]
})
export class CoreModule { }
