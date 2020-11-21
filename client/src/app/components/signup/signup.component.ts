import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { State } from 'src/app/shared/store';
import { TrySignup } from 'src/app/shared/store/actions/auth.actions';
import { errorAuthSelector } from 'src/app/shared/store/selectors/auth.selectors';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public form: FormGroup;
  public error$: Observable<string>;

  constructor(
    private fb: FormBuilder,
    private store: Store<State>
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: [''],
      name: [''],
      password: [''],
    });
    this.error$ = this.store.pipe(
      select(errorAuthSelector)
    );
  }

  submit(): void {
    this.store.dispatch(new TrySignup(this.form.value));
  }
}
