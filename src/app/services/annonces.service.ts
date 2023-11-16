import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class AnnoncesService {
  url ='https://articlesmanagement-cbe66-default-rtdb.europe-west1.firebasedatabase.app/annonces.json';
  constructor(private httpClient: HttpClient) {}
  // retourne tout les annonces
  getAllAnnonces(): Observable<any> {
    return this.httpClient.get(
      // eslint-disable-next-line max-len
      this.url
    );
  }
  // ajouter un annonce
  addAnnonce(annonce: any): Observable<any> {
    return this.httpClient.post(
      this.url,
      annonce
    );
  }
  getAnnonceById(id: string): Observable<any> {
    return this.httpClient.get<any>(
      `https://articlesmanagement-cbe66-default-rtdb.europe-west1.firebasedatabase.app/annonces/${id}.json`
    )
      .pipe(
        map(annonce => ({...annonce, id})),
        catchError(error => {
          // Handle any errors that may occur
          console.error(error);
          return of(null);
        })
      );
  }

  // retourne tout les annonces d'un utlisateur par son email
  getAnnonceByUId(mail: any): Observable<any> {
    return this.httpClient.get(
      'https://articlesmanagement-cbe66-default-rtdb.europe-west1.firebasedatabase.app/annonces.json?orderBy="createdBy"&equalTo="'+mail+'"'
    );
  }

  deleteAnnonceById(id: string): Observable<void> {
    return this.httpClient.delete<void>(
      `https://articlesmanagement-cbe66-default-rtdb.europe-west1.firebasedatabase.app/annonces/${id}.json`
    )
      .pipe(
        catchError(error => {
          console.error(error);
          return of(null);
        })
      );
  }
  // Update annonce:
  updateAnnonce(annonce: any): Observable<any> {
    return this.httpClient.put(
      'https://articlesmanagement-cbe66-default-rtdb.europe-west1.firebasedatabase.app/annonce/' +
        annonce.id +
        '.json',
      annonce
    );
  }
}
