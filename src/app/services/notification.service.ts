import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private messageSource = new BehaviorSubject<string | null>(null);
  message$ = this.messageSource.asObservable();

  showMessage(message: string): void {
    this.messageSource.next(message);

    setTimeout(() => this.messageSource.next(null), 3000);
  }
}
