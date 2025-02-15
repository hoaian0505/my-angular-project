// src/app/components/dog-list/dog-list.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DogService } from '../services/dog.services';
import { DogImage } from 'src/app/core/models/dog.model';
import * as _ from 'lodash';
import { finalize } from 'rxjs';
import { LoadingService } from 'src/app/core/services/loading.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';

@Component({
  selector: 'app-dog-list',
  templateUrl: './dog-list.component.html',
  styleUrls: ['./dog-list.component.css'],
})
export class DogListComponent implements OnInit {
  breeds: DogImage[] = [];
  newBreeds: DogImage[] = [];
  currentPage: number = 0;
  limit: number = 10;
  currentIndex = 0;
  showDetail = false;

  constructor(
    private _dogService: DogService,
    private router: Router,
    private _loadingService: LoadingService,
    private _localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    const savedPage = localStorage.getItem('currentPage');
    if (savedPage) {
      this.currentPage = +savedPage;
    }
    this.loadBreeds();
  }

  loadBreeds(): void {
    this._loadingService.setLoading(true);
    this._dogService
      .getRandomBreeds(this.limit)
      .pipe(
        finalize(() => {
          this._loadingService.setLoading(false);
        })
      )
      .subscribe({
        next: (data) => {
          this.breeds = data;
          this.preloadImages(this.breeds);
        },
        error: (err) => console.error('Error:', err),
      });
  }

  // Handle vote: -1 (reject), 1 (like), 2 (super like)
  onVote(voteValue: number): void {
    const currentImg = this.breeds[this.currentIndex];
    if (!currentImg) return;

    this._loadingService.setLoading(true);
    this._dogService
      .voteBreed(currentImg.id, voteValue)
      .pipe(
        finalize(() => {
          this._loadingService.setLoading(false);
        })
      )
      .subscribe({
        next: (res) => {
          // After vote, change to another breed
          this.currentIndex++;
          this.showDetail = false;
          if (this.currentIndex === this.breeds.length - 5) {
            this._dogService.getRandomBreeds(this.limit).subscribe({
              next: (data) => {
                this.newBreeds = data;
                this.preloadImages(this.newBreeds);
              },
              error: (err) => console.error('Error:', err),
            });
          } else if (this.currentIndex === this.breeds.length) {
            this.currentIndex = 0;
            this.breeds = _.cloneDeep(this.newBreeds);
          }
          this._localStorageService.set('imgId',this.breeds[this.currentIndex].id);
        },
        error: (err) => console.error('Vote error:', err),
      });
  }

  goToDetails(breed: DogImage): void {
    this._dogService.getVote().subscribe(res => {})
    if (breed.breeds?.length){
      this.showDetail = true;
    }
  }
  
  closeDetail(): void {
    this.showDetail = false;
  }

  goToLikes(): void {
    this.router.navigate(['/votes']);
  }

  private preloadImages(images: DogImage[]): void {
    images.forEach((imgData) => {
      if (imgData.url) {
        const img = new Image();
        img.src = imgData.url;
      }
    });
  }
}
