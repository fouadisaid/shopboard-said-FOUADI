import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { ProduitVm } from '../../../core/models/produit.vm';

@Component({
  selector: 'app-produit-card',
  imports: [],
  templateUrl: './produit-card.html',
  styleUrl: './produit-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProduitCard {
  produit = input.required<ProduitVm>();

  ajouterAuPanier = output<ProduitVm>();

  onAjouter(): void {
    this.ajouterAuPanier.emit(this.produit());
  }
}