import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoadingService } from 'src/app/core/services/loading.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit, OnDestroy {
  loading: boolean = false;
  private loadingSubscription!: Subscription;

  constructor(private loadingService: LoadingService) {}

  ngOnInit(): void {
    this.loadingSubscription = this.loadingService.loading$.subscribe(
      (isLoading: boolean) => {
        this.loading = isLoading;
      }
    );
  }

  ngOnDestroy(): void {
    if (this.loadingSubscription) {
      this.loadingSubscription.unsubscribe();
    }
  }
}