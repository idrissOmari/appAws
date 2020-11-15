import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { JwtToken } from '../../models/JwtToken.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit, OnDestroy {
  public jwtToken: JwtToken;
  public suscription: Subscription;

  constructor(private authService: AuthService) { }
  ngOnDestroy(): void {
    if (this.suscription) { this.suscription.unsubscribe(); }
  }

  ngOnInit(): void {
    this.suscription = this.authService.jwtToken.subscribe((jwtToken: JwtToken) => {
      this.jwtToken = jwtToken;
    });
  }

  logout(): void {
    this.authService.logout();
  }

}
