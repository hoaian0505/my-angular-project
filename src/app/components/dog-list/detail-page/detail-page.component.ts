// src/app/components/detail-page/detail-page.component.ts
import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { DogService } from '../../services/dog.services';
import { Breed } from 'src/app/core/models/dog.model';
import { LoadingService } from 'src/app/core/services/loading.service';
import { finalize, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.css'],
})
export class DetailPageComponent implements OnInit, OnDestroy {
  @Input() breedInfo: any;
  @Output() voteEvent = new EventEmitter<number>();
  @Output() closeDetail = new EventEmitter<void>();

  breedDetails!: Breed;

  private destroy$ = new Subject<void>();

  constructor(
    private _dogService: DogService,
    private _loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    if (this.breedInfo && this.breedInfo.breeds[0].id) {
      this._loadingService.setLoading(true);
      this._dogService
        .getBreedById(this.breedInfo.breeds[0].id)
        .pipe(
          takeUntil(this.destroy$),
          finalize(() => {
            this._loadingService.setLoading(false);
          })
        )
        .subscribe({
          next: (data: Breed) => {
            this.breedDetails = data;
          },
          error: (err) => {
            console.error('Error fetching breed details:', err);
          },
        });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onVote(vote: number): void {
    this.voteEvent.emit(vote);
  }

  onClose(): void {
    this.closeDetail.emit();
  }
}
