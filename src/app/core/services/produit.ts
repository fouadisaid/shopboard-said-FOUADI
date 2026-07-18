import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ProduitDto } from '../models/produit.dto';

@Injectable({
  providedIn: 'root',
})
export class ProduitService {
  private http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000/produits';

  getAll(): Observable<ProduitDto[]> {
    return this.http.get<ProduitDto[]>(this.apiUrl).pipe(
      catchError((error) => {
        console.error('Erreur lors du chargement des produits', error);
        return of([]);
      })
    );
  }

  getById(id: string): Observable<ProduitDto> {
    return this.http.get<ProduitDto>(`${this.apiUrl}/${id}`);
  }
}