import { ChangeDetectionStrategy, Component, input, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-produit-detail',
  imports: [],
  templateUrl: './produit-detail.html',
  styleUrl: './produit-detail.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProduitDetail {
  private router = inject(Router);

  id = input.required<string>();

  retour(): void {
    this.router.navigate(['/produits']);
  }
}