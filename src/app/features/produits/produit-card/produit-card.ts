import { ChangeDetectionStrategy, Component, input, output, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ProduitVm } from '../../../core/models/produit.vm';

@Component({
  selector: 'app-produit-card',
  imports: [],
  templateUrl: './produit-card.html',
  styleUrl: './produit-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProduitCard {
  private router = inject(Router);

  produit = input.required<ProduitVm>();
  ajouterAuPanier = output<ProduitVm>();

  onAjouter(): void {
    this.ajouterAuPanier.emit(this.produit());
  }

  voirDetail(): void {
    this.router.navigate(['/produits', this.produit().id]);
  }
}