import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/User.model';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public form: FormGroup;
  public error: string;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: [''],
      name: [''],
      password: [''],
    });
  }

  submit(): void {
    this.authService.signup(this.form.value).subscribe(
      (user: User) => {
        this.router.navigate(['/signin']);
      }
      , (err) => {
          this.error = err.error;
      }
    );
  }
}
