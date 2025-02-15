import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Breed, DogImage, VoteHistory } from 'src/app/core/models/dog.model';
import { ApiService } from 'src/app/core/services/api.service';
import { environment } from 'src/enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class DogService {
    // baseURL
    private _baseUrl = `${environment.apiUrl}`;

    constructor(private _apiService: ApiService) {}

    //get one random breed
    getRandomBreed(): Observable<DogImage> {
        const url = `${this._baseUrl}/images/search`;
        return this._apiService.get<DogImage>(url);
    }

    getBreedById(id: string): Observable<Breed> {
        const url = `${this._baseUrl}/breeds/${id}`;
        return this._apiService.get<Breed>(url);
    }

    //get ten random breeds
    getRandomBreeds(limit: number = 10): Observable<DogImage[]> {
        const url = `${this._baseUrl}/images/search?limit=${limit}`;
        return this._apiService.get<DogImage[]>(url);
    }
    
    voteBreed(id: string, vote: number): Observable<any> {
        const payload = { image_id: id, value: vote };
        return this._apiService.post(`${this._baseUrl}/votes`, payload);
    }

    //get total votes
    getVote(): Observable<VoteHistory[]>{
        return this._apiService.get(`${this._baseUrl}/votes`);
    }
}
