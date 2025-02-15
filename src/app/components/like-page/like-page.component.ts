import { Component, OnDestroy, OnInit } from '@angular/core';
import { DogService } from '../services/dog.services';
import { VoteHistory } from 'src/app/core/models/dog.model';
import { finalize, Subject, takeUntil } from 'rxjs';
import { LoadingService } from 'src/app/core/services/loading.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-like-page',
  templateUrl: './like-page.component.html',
  styleUrls: ['./like-page.component.css'],
})
export class LikesPageComponent implements OnInit, OnDestroy {
  likes: VoteHistory[] = [];
  dislikes: VoteHistory[] = [];
  superLikes: VoteHistory[] = [];
  filter: 'all' | 'likes' | 'dislikes' | 'superLikes' = 'all';

  private destroy$ = new Subject<void>();

  constructor(
    private _dogService: DogService,
    private _loadingService: LoadingService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.getVotes();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getVotes(): void {
    this._loadingService.setLoading(true);
    this._dogService
      .getVote()
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this._loadingService.setLoading(false);
        })
      )
      .subscribe({
        next: (votes: VoteHistory[]) => {
          this.likes = votes.filter((vote) => vote.value === 1);
          this.dislikes = votes.filter((vote) => vote.value === -1);
          this.superLikes = votes.filter((vote) => vote.value === 2);
        },
        error: (err) => {
          console.error('Error fetching votes:', err);
        },
      });
  }

  setFilter(value: 'all' | 'likes' | 'dislikes' | 'superLikes'): void {
    this.filter = value;
  }

  goHome(): void {
    this._router.navigate(['/']);
  }
}
