import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AccountService } from 'app/core/auth/account.service';
import { timer } from 'rxjs';
import { Router } from '@angular/router';
import { Account } from 'app/core/auth/account.model';

@Component({
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  account: Account | null = null;
  authSubscription?: Subscription;

  testSineVal = 0;
  testClicks = 0;
  testUnselected = [
    { nombre: 'Visita domiciliaria' },
    { nombre: 'Sepelio' },
    { nombre: '🚑 Traslado' },
    { nombre: 'Enfermería en gabinete' },
    { nombre: '🔥 Cremación' },
    { nombre: 'Remisse' },
  ];
  testSelected: any[] = [];

  private readonly destroy$ = new Subject<void>();

  constructor(private accountService: AccountService, private router: Router) {}

  ngOnInit(): void {
    this.accountService
      .getAuthenticationState()
      .pipe(takeUntil(this.destroy$))
      .subscribe(account => (this.account = account));

    // TEST
    const source = timer(0, 100);
    source.subscribe(v => {
      /* eslint no-console: "off" */
      console.log(v);
      this.testSineVal = Math.sin(new Date().getTime()) * 100;
    });
  }

  isAuthenticated(): boolean {
    return this.accountService.isAuthenticated();
  }

  login(): void {
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  testClick(): void {
    this.testClicks++;
  }

  testSelect(t: any): void {
    this.testUnselected = this.testUnselected.filter(obj => obj !== t);
    this.testSelected.push(t);
  }

  testUnselect(t: any): void {
    this.testSelected = this.testSelected.filter(obj => obj !== t);
    this.testUnselected.push(t);
  }
}
